import { BasicDate } from "./generic";


/**
 * @additionalProperties false
 */
export interface ScheduleDay extends BasicDate {
    /**
     * List of events to be held on this day. Care should be taken that the times
     * do not overlap: there is currently no support for this and it will cause
     * issues with the display.
     * 
     * @additionalProperties false
     */
    events: {
        name: string;

        /**
         * Time of the event (in 24hr time)
         * @pattern ^\d\d?\:\d\d$
         */
        time: string;

        /**
         * Length of the event as hh:mm
         * @pattern ^\d\d?\:\d\d$
         */
        duration: string;

        /**
         * Change the color from the default purple. Accepts any valid css color string
         */
        color?: string;

        /**
        * Optional link. Use '#link' to link to an id on the page, otherwise use an
        * absolute url
        */
        link?: string;

        /**
         * Used to control where the event appears when mutliple events are stacked
         * side by side. Higher priority events appear closer to the left.
         */
        priority?: number;

        /**
         * Optional string or list of strings listing the rooms.
         */
        room?: string | string[];

        /**
         * For internal use only. Do not manually set. This will be used in config
         * generated by the calendar creator
         */
        widthFactor?: number;

        /**
         * For internal use only. Do not manually set. This will be used in config
         * generated by the calendar creator
         */
        position?: number;
    }[];
}

/**
 * @additionalProperties false
 */
export interface ScheduleConfig {
    show: boolean;

    /**
     * First hour to display on the schedule (in 24hr time).
     * @minimum 0
     * @maximum 23
     */
    startTime: number;

    /**
     * Last hour to display on the schedule (in 24hr time).
     * Events falling after this will be clipped.
     * @minimum 0
     * @maximum 23
     */
    endTime: number;

    /**
     * List of days to include in the schedule. Each day contains its own scheduled
     * events.
     */
    days: ScheduleDay[];

    
}

