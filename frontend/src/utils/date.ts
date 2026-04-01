export function dateConfig(dateString: string) {
  const date = new Date(dateString);

  const currYear = new Date().getFullYear();

  const inputDateYear = date.getFullYear();

  if (currYear == inputDateYear) {
    return date.toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    });
  } else {
    const day = date.getDate().toString();

    const month = (date.getMonth() + 1).toString();

    const year = inputDateYear.toString().slice(2, 4);

    return `${day}/${month}/${year}`;
  }
}
