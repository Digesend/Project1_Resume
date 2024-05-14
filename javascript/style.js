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
    var experienceElements = document.querySelectorAll('[id^="experience"]');
    var totalExperience = { years: 0, months: 0 };

    for(var i =0;i<dateElements.length;i++){
        dateElements[i].style.color="gray";
        dateElements[i].style.size="2px";
    }

    for(var i=0;i<experienceElements.length;i++){
        experienceElements[i].style.color="darkred";
        experienceElements[i].style.size="2px";
        experienceElements[i].style.fontStyle="italic";
    }

    // 각 요소에 대해 경력 계산
    dateElements.forEach(function(dateElement) {
        var experienceElements = dateElement.nextElementSibling; // 경력 텍스트를 표시할 요소 가져오기
        var dates = dateElement.textContent.split(' ~ ');
        var experience = calculateExperience(dates[0], dates[1]);
        if(experience.years){
            if(experience.months)
                experienceElements.textContent = experience.years+"년 "+experience.months+"개월";
            else
                experienceElements.textContent = experience.years+"년 ";
        }
        else
            experienceElements.textContent = experience.months+"개월";

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
    if(endDate === "재직중"){   /*js에서는 ==이 아니라 ===, _T는 안 쓴다. */
        var today = new Date();
        endDate = today;
    }

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
var total_experienceSpan = document.getElementById('total_experience');

if(totalExperience.years){
    if(totalExperience.months)
        total_experienceSpan.textContent="총 경력 : "+totalExperience.years+"년"+totalExperience.months+"개월";
    else
        total_experienceSpan.textContent="총 경력 : "+totalExperience.years+"년";
}
else
    total_experienceSpan.textContent="총 경력 : "+totalExperience.months+"개월";

/*console.log("전체 경력:", totalExperience.years, "년", totalExperience.months, "개월");*/