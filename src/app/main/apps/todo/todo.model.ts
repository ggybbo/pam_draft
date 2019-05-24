export class Todo {
  key: string;
  tid: number;
  userId: number;
  name?: string;
  nick?: string;
  level?: number;
  title: string;
  notes: string;
  question?: string;
  answer?: string;
  startDate: string;
  dueDate: boolean;
  completed: boolean;
  starred: boolean;
  important: boolean;
  deleted: boolean;
  tmp3Title?: string;
  tmp3Url?: string;
  ump3Title?: string;
  ump3Url?: string;
  tags: [
    {
      id: number;
      name: string;
      label: string;
      color: string;
    }
  ];

  /**
   * Constructor
   *
   * @param todo
   */
  constructor(todo) {
    {
      this.key = todo.key;
      this.tid = todo.tid || 0;
      this.userId = todo.userId;
      this.name = todo.name;
      this.nick = todo.nick;
      this.level = todo.level;
      this.title = todo.title;
      this.notes = todo.notes;
      this.question = todo.question;
      this.answer = todo.answer;
      this.startDate = todo.startDate;
      this.dueDate = todo.dueDate;
      this.completed = todo.completed;
      this.starred = todo.starred;
      this.important = todo.important;
      this.deleted = todo.deleted;
      this.tmp3Title = todo.tmp3Title;
      this.tmp3Url = todo.tmp3Url;
      this.ump3Title = todo.ump3Title;
      this.ump3Url = todo.ump3Url;
      this.tags = todo.tags || [];
    }
  }

  /**
   * Toggle star
   */
  toggleStar(): void {
    this.starred = !this.starred;
  }

  /**
   * Toggle important
   */
  toggleImportant(): void {
    this.important = !this.important;
  }

  /**
   * Toggle completed
   */
  toggleCompleted(): void {
    this.completed = !this.completed;
  }

  /**
   * Toggle deleted
   */
  toggleDeleted(): void {
    this.deleted = !this.deleted;
  }
}
