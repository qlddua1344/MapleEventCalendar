//달력 구동 프로그램
/*
    필요한 요소들
    1. 오늘 날짜
    2. 이벤트 시작 날짜
    3. 이벤트 종료 날짜.

    4. 현재날짜 부터 종료날짜 까지 남은 기간.
*/

const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);    //기준과 달 이동을 위한 객체. 오늘날은 사용할때 생성할거임.
const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);   //이번달의 마지막 날.
const EventStart = new Date('2020-12-17');
const EventEnd = new Date('2020-02-28');
const CalTable = document.querySelector('.CalDate');

const prevLastDay = new Date(new Date().getFullYear(), new Date().getMonth(), 0);

//이벤트
let EventDay = '';
let EventArray = [];
const neo = ['Neo', '2020-12-17', '2021-02-24'];
const TerraBurning = ['TerraBurning', '2020-12-17', '2021-03-10'];



function AddEvent(Event){
    //날자를 입력받아서 start, end에 저장함.
    const EventName =  Event[0];
    const EventStart = new Date(Event[1]);
    const EventEnd = new Date(Event[2]);
    
    for(let i = 1; i <= lastDay.getDate(); i++){
        if(i === EventStart.getDate() && firstDay.getMonth() === EventStart.getMonth() && firstDay.getFullYear() === EventStart.getFullYear()){
            document.querySelector('.date' + i + '').setAttribute('class', 'date' + i + ' ' + EventName + 'Start');     //새로운 이벤트를 생성했다면 클래스도 만들어줘야함. 이름을 지정해줘야하기 때문에
        }
        else if(i === EventEnd.getDate() && firstDay.getMonth() === EventEnd.getMonth() && firstDay.getFullYear() === EventEnd.getFullYear()){
            document.querySelector('.date' + i + '').setAttribute('class', EventName + 'End');
        };
    };
    

};

function EventChaDate(Event){
    const EventName =  Event[0];
    const EventStart = new Date(Event[1]);
    const EventEnd = new Date(Event[2]);

    
    let tumpDate = EventEnd.getTime() - new Date().getTime();
    const result = Math.round(tumpDate / (1000 * 60 * 60 * 24));

    

    EventArray.push(EventName);
    EventDay += EventName + ' 종료까지 남은 기간 : ' + result + ' 일<br>';
    document.querySelector('.EventCalc').innerHTML = EventDay;

}

function Cal(){
    let table = '';
    let DateCount = 1;
    document.querySelector('.year').innerHTML = firstDay.getFullYear() + ' 년';
    document.querySelector('.month').innerHTML = (firstDay.getMonth() + 1) + ' 월';
/*
    for(let i = 0; i < firstDay.getDay(); i++){
        table += '<td class="prev-date">' + (prevLastDay.getDate() - i) + '</td>';
    };
*/
7 - lastDay.getDay() + 1
    for(let i = 1; i < 7; i++){
        table += '<tr>';
        for(let j = 1; j <= 7; j++){
            if(firstDay.getDay() >= j && i === 1){  //1일 전에는 검은화면 출력
                table += '<td class="prev-date"></td>';
            }
            else if(new Date().getDate() === DateCount && new Date().getMonth() === firstDay.getMonth() && new Date().getFullYear() === firstDay.getFullYear()){   //오늘날 찾아내기.
                table += '<td class="today">' + DateCount + '</td>';
                DateCount += 1;
            }
            else if(DateCount <= lastDay.getDate()){     //1일 부터 달의 마지막 날까지 생성.
                table += '<td class="date' + DateCount + '">' + DateCount + '</td>';
                DateCount += 1;
            }
            else if(DateCount >= lastDay.getDate()){    //마지막 날 이후는 검은화면.
                table += '<td class="next-date"></td>';
            }
        };
        table += '</tr>';
    };

    CalTable.innerHTML = table;
    AddEvent(neo);      //네오 이벤트 표시
    AddEvent(TerraBurning);
};

//달 이동 핸들러
document.querySelector('.prev').addEventListener('click', function(){
    firstDay.setMonth(firstDay.getMonth() - 1);
    Cal();
});
document.querySelector('.next').addEventListener('click', function(){
    firstDay.setMonth(firstDay.getMonth() + 1);
    Cal();
});
//document.querySelector('.prev').setAttribute('class','aa');


Cal();  //달력생성.

//오늘날부터 이벤트 종료일까지 계산
EventChaDate(neo);
EventChaDate(TerraBurning);