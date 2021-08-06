<template>
    <v-container  >
        <v-layout wrap style="margin-top: 80px;">
             <v-flex sm12 md6 offset-md3>
                <v-card>
                    <v-col md="12" >
                        <h2 class="text-center">
                            You've been invited to Team!
                        </h2>
                    </v-col>
                    <v-col md="12">
                    <form>
                        <v-col md="12">
                            <v-row>
                                <v-col md="6">
                                    <v-btn color="success" type="submit" >
                                        Accept Invitation
                                    </v-btn>
                                </v-col>
                                <v-col md="6">
                                    <v-btn type="submit">
                                        Decline
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </form>
                    </v-col>
                </v-card>
             </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'detail-invitation',
    
}
</script>