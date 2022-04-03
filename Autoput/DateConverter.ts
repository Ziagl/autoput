/*
 * this class contains usefull functions to convert between date types
 */
export abstract class DateConverter {

  /*
   * converts a date string from mysql database like "2022-01-01 23:59:59" 
   * to a JavaScript Date object
   */
  public static dBDateToJSDate(date: string): Date {
    var t = date.split(/[- :]/);
    return new Date(
      parseInt(t[0]),
      parseInt(t[1]) - 1,
      parseInt(t[2]),
      parseInt(t[3]),
      parseInt(t[4]),
      parseInt(t[5])
    );
  }

  /*
   * converts a JavaScript Date object into a string for a mysql database
   * with following format: "2022-01-01 23:59:59"
   */
  public static jSDateToDBDate(date: Date): string {
    return date.getFullYear() + "-" +
      (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
      date.getDate().toString().padStart(2, '0') + " " +
      date.getHours().toString().padStart(2, '0') + ":" +
      date.getMinutes().toString().padStart(2, '0') + ":" +
      date.getSeconds().toString().padStart(2, '0');
  }
}