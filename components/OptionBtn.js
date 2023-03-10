import store from "/file?path=library/store.js"
export default {
    data() {
        return {
            dialog: false,
            store,
        }
    },
    template:
`
<div class="text-center">
<v-btn color="primary" size="small">
    options
    <v-dialog v-model="dialog" activator="parent" width="60%">
        <v-card>
            <v-card-title class="text-h5">
                options
            </v-card-title>

            <v-card-text>
                <v-row class="d-flex align-center">
                    <!-- software -->
                    <v-col cols="3" class="py-0">
                        <p class="font-weight-bold">software</p>
                    </v-col>
                    <v-col cols="9" class="py-0">
                        <v-radio-group inline class="d-flex justify-left">
                            <input type="radio" name="software" id="dicomifier" value="dicomifier"
                                v-model="store.software">
                            <label for="dicomifier">dicomifier</label>
                            <input class="ml-2" type="radio" name="software" id="dcm2niix" value="dcm2niix"
                                v-model="store.software">
                            <label for="dcm2niix">dcm2niix</label>
                        </v-radio-group>
                    </v-col>

                    <!-- output type -->
                    <v-col cols="3" class="py-0">
                        <p class="font-weight-bold">output type</p>
                    </v-col>
                    <v-col cols="9" class="py-0">
                    <v-radio-group inline class="d-flex justify-left">
                        <input type="radio" name="output_type" id="zip" value="zip"
                            v-model="store.output_type">
                        <label for="zip">zip</label>
                        <input type="radio" name="output_type" id="tar.gz" value="tar.gz"
                            v-model="store.output_type">
                        <label for="tar.gz">tar.gz</label>
                        <input class="ml-2" type="radio" name="output_type" id="files" value="files"
                            v-model="store.output_type">
                        <label for="files">files</label>
                    </v-radio-group>
                    </v-col>

                    <!-- output directory -->
                    <v-col cols="3" class="py-0">
                        <p class="font-weight-bold">output directory</p>
                    </v-col>
                    <v-col cols="9" class="py-0">
                        <v-text-field variant="underlined" v-model="store.output_dir"></v-text-field>
                    </v-col>


                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = false" variant="text">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-btn>
</div>
`
}