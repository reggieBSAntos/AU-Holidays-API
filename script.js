"use strict";

const url =
  "https://script.google.com/macros/s/AKfycbxWjMXwzkOdChHbxR9RBXtUAdwCLZkNXsxkx6kumdUmIYxb5rjAQq3xrEIHdOtAFJXhcA/exec";

const getHolidays = async () => {
  try {
    const res = await fetch(url);

    const holidays = await res.json();

    console.log(holidays);

    holidays.forEach((holiday) => {
      const [yr, mo, dy] = holiday.start.split("-");
      holiday.start = new Date(yr, parseInt(mo) - 1, dy, 0, 0, 0);
    });

    holidays.sort((a, b) => a.start - b.start);

    const container = document.createElement("div");
    container.classList = "timeline";
    container.innerHTML = holidays
      .map((holiday, holidayIndex) => {
        if (holidayIndex % 2 == 0) {
          return `<div class="timeline__component">
                  <div class="timeline__date timeline__date--right">${holiday.start.toDateString()}</div>
                </div>
                <div class="timeline__middle">
                  <div class="timeline__point"></div>
                </div>
                <div class="timeline__component timeline__component--bg">
                  <h2 class="timeline__title">${holiday.summary}</h2>
                  <p class="timeline__paragraph">
                   ${holiday.description}
                  </p>
                </div>`;
        } else {
          return ` <div
                    class="timeline__component ${
                      holidayIndex === holidays.length - 1
                        ? `timeline__component--bottom`
                        : ""
                    } timeline__component--bg"
                  >
                    <h2 class="timeline__title">${holiday.summary}</h2>
                    <p class="timeline__paragraph">
                      ${holiday.description}
                    </p>
                  </div>
                  <div class="timeline__middle">
                    <div class="timeline__point"></div>
                    ${
                      holidayIndex === holidays.length - 1
                        ? `<div class="timeline__point timeline__point--bottom"></div>`
                        : ""
                    }
                  </div>
                  <div class="timeline__component ${
                    holidayIndex === holidays.length - 1
                      ? ` timeline__component--bottom`
                      : ""
                  }">
                    <div class="timeline__date">${holiday.start.toDateString()}</div>
                  </div>`;
        }
      })
      .join("");

    document.body.insertAdjacentElement("afterbegin", container);
  } catch (err) {
    console.log(err.message);
  }
};

document.addEventListener("DOMContentLoaded", getHolidays);
