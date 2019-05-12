import { Component, Vue } from 'vue-property-decorator';
import { WingsStructUtil } from 'wings-ts-util';
import CEditTrip from '../components/CEditTrip.vue';
import HTTPReq from '../shared/HTTPReq';
import Trip from '../structs/Trip';

@Component({
    data() {
        return {
            trip: new Trip(),
        };
    },
    components: {
        CEditTrip,
    },
})

export default class VNewTrip extends Vue {
    private cancel(): void {
        this.$router.back();
    }

    private save(trip: Trip): void {
        this.$data.trip = trip;
        HTTPReq.post(
            'trip',
            WingsStructUtil.stringify(trip),
            (newTrip: string) => {
                this.$router.push('/trip/view/' + JSON.parse(newTrip).id);
            },
        );
    }
}
