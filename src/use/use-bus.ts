import { onBeforeUnmount } from 'vue';

import { eventBus } from '../services/event-bus-service';

type EventType = string;
type Handler = Function;

function useBus() {
    function setBusListener(event: EventType, handler: Handler) {
        busOn(event, handler);

        onBeforeUnmount(() => {
            busOff(event, handler);
        });
    }

    function busOn(event: EventType, handler: Handler) {
        // @ts-ignore
        eventBus.on(event, handler);
    }
    function busOff(event: EventType, handler: Handler) {
        // @ts-ignore
        eventBus.off(event, handler);
    }
    function busEmit(event: EventType, value?: any) {
        eventBus.emit(event, value);
    }

    return {
        busOn,
        busOff,
        busEmit,
        setBusListener
    };
}

export default useBus;
