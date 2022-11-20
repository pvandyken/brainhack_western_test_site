import { BasicDate } from './generic';

export interface EventPosition {
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
}

interface EventBase {
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
   * Change the color from the default purple. Accepts any valid css color
   * string
   */
  color?: string;

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
}

/**
 * @additionalProperties false
 */
export interface GenericEvent extends EventBase {
  name: string;

  /**
   * Optional link. Use '#link' to link to an id on the page, otherwise use an
   * absolute url
   */
  link?: string;
}

/**
 * Event that links to a tutorial definition
 * @additionalProperties false
 */
export interface TutorialEvent extends EventBase {
  /**
   * Id of the tutorial
   */
  tutorial: string;
}

export type AnyEvent = GenericEvent | TutorialEvent;

/**
 * @additionalProperties false
 */
export interface ScheduleDay<T extends EventBase> extends BasicDate {
  /**
   * List of events to be held on this day.
   */
  events: T[];
}

/**
 * @additionalProperties false
 */
export interface ScheduleConfig<T extends EventBase> {
  /**
   * Name of the schedule.
   */
  name: string;

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
  days: ScheduleDay<T>[];
}
