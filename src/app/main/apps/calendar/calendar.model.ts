import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';

export class CalendarEventModel {
  start: Date;
  end?: Date;
  startTime?: string;
  endTime?: string;
  title: string;
  color: {
    primary: string;
    secondary: string;
  };
  actions?: CalendarEventAction[];
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: {
    location: string;
    notes: string;
    level: number;
  };

  constructor(data?) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = new Date(data.end) || endOfDay(new Date());
    this.startTime = data.startTime || '';
    this.endTime = data.endTime || '';
    this.title = data.title || '';
    this.color = {
      primary: (data.color && data.color.primary) || '#1e90ff',
      secondary: (data.color && data.color.secondary) || '#D1E8FF'
    };
    this.draggable = data.draggable;
    this.resizable = {
      beforeStart: (data.resizable && data.resizable.beforeStart) || true,
      afterEnd: (data.resizable && data.resizable.afterEnd) || true
    };
    this.actions = data.actions || [];
    this.allDay = data.allDay || false;
    this.cssClass = data.cssClass || '';
    this.meta = {
      location: (data.meta && data.meta.location) || '',
      notes: (data.meta && data.meta.notes) || '',
      level: (data.meta && data.meta.level) || ''
    };
  }
}
