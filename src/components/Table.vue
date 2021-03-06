<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">-- none --</option>
                        </b-form-select>
                        <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
                            <option :value="false">Asc</option> <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortDirection" slot="append">
                            <option value="asc">Asc</option> <option value="desc">Desc</option>
                            <option value="last">Last</option>
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col md="6" class="my-1">
                <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                    <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table
                show-empty
                striped hover
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :busy="isBusy"
                @filtered="onFiltered"
                :small="small"

        >
            <div slot="table-busy" class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
            </div>
            <template slot="name" slot-scope="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>

            <template slot="isActive" slot-scope="row">
                {{ row.value ? 'Yes :)' : 'No :(' }}
            </template>

            <template slot="actions" slot-scope="row">
                <!--<b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">-->
                    <!--Info modal-->
                <!--</b-button>-->
                <b-button variant='primary' size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>

            <template slot="row-details" slot-scope="row">
                <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                </b-card>
            </template>
        </b-table>

        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="5"
                        class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal id="modal-info" @hide="resetModal" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
        </b-modal>
    </b-container>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Table",
        data() {
            return {
                items: [],
                isBusy: true,
                fields: [
                    { key: 'ticket', label: 'Ticket Id', sortable: true, sortDirection: 'desc' },
                    { key: 'Requestor', label: 'Requestor Id', sortable: true, class: 'text-center' },
                    { key: 'ITOwner', label: 'IT Owner Id', sortable: true },
                    { key: 'FiledAgainst', label: 'Filed Against', sortable: false },
                    { key: 'TicketType', label: 'Ticket Type', sortable: false },
                    { key: 'Severity', label: 'Severity', sortable: true },
                    { key: 'Priority', label: 'Priority', sortable: true },
                    { key: 'Ticket Creation Date', label: 'Date Created', sortable: true },
                    { key: 'actions', label: 'Actions' }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                modalInfo: { title: '', content: '' },
                small: true,
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return { text: f.label, value: f.key }
                    })
            }
        },
        mounted() {

            if (this.totalRows !== 0) {
                this.isBusy = !this.isBusy;
            }

            axios
                .get('http://localhost:3000/ticket')
                .then(response => {
                    this.items = response.data;
                    this.totalRows = response.data.length
                    // console.log(response.data)
                });
        },
        methods: {
            info(item, index, button) {
                this.modalInfo.title = `Row index: ${index}`
                this.modalInfo.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', 'modalInfo', button)
            },
            resetModal() {
                this.modalInfo.title = '';
                this.modalInfo.content = ''
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        }
    }
</script>