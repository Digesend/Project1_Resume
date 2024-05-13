function calculateAge() {
    var birthdate = new Date('1992-12-27');
    var today = new Date();
    
    var age = today.getFullYear() - birthdate.getFullYear();
    var monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    
    return age;
  }
  
  var age = calculateAge();
  var resultSpan = document.getElementById('result');
  resultSpan.textContent = "(만"+age+"세)";

  function calculateExperienceForAllDates() {
    // 모든 date id를 가진 요소를 선택
    var dateElements = document.querySelectorAll('[id^="date"]');
    /*var totalExperience = { years: 0, months: 0 };*/

    // 각 요소에 대해 경력 계산
    dateElements.forEach(function(dateElement) {
        var dates = dateElement.textContent.split(' ~ ');
        var experience = calculateExperience(dates[0], dates[1]);
        totalExperience.years += experience.years;
        totalExperience.months += experience.months;

        // months가 12보다 크면 years에 추가하고 12로 나머지 계산
        if (totalExperience.months >= 12) {
            totalExperience.years += Math.floor(totalExperience.months / 12);
            totalExperience.months = totalExperience.months % 12;
        }
    });

    return totalExperience;
}

function calculateExperience(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var yearDiff = end.getFullYear() - start.getFullYear();
    var monthDiff = end.getMonth() - start.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    return { years: yearDiff, months: monthDiff };
}

var totalExperience = calculateExperienceForAllDates();
console.log("전체 경력:", totalExperience.years, "년", totalExperience.months, "개월");