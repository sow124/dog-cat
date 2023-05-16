import { useLocation, useParams } from "react-router";
import { IoIosInformationCircle } from 'react-icons/io';
import '../Dog/dog.css'

declare global {
  interface Window {
    kakao: any;
  }
}

function Detail(){
  const { desertionNo } = useParams<{ desertionNo: string }>(); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const animals:any = searchParams.get("animals");
  const animal = JSON.parse(decodeURIComponent(animals));
  const regex = /\[(.*?)\]/g;
  const animalKind = animal.kindCd.replace(regex, '');

  const script = document.createElement("script");
script.async = false; // 비동기가 아닌 동기적으로 스크립트를 로드
script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=82a2d2e3883834b8a2b2cf1015b17f3e&libraries=services&autoload=false`;
document.head.appendChild(script);

script.onload = () => {
  const { kakao } = window;
  kakao.maps.load(() => {
    // const geocoder = new kakao.maps.services.Geocoder();
    const container = document.getElementById("map");
    const carecontainder=document.getElementById("map1");
    var map1Container = document.getElementById('map1'),
    map1Option = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
  };  
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 
var map1 = new kakao.maps.Map(map1Container, map1Option); 
// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();
var caregeocoder = new kakao.maps.services.Geocoder();
// 주소로 좌표를 검색합니다
geocoder.addressSearch(animal.happenPlace, function(result:any, status:any) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${animal.happenPlace}</div>`
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
    caregeocoder.addressSearch(animal.careAddr, function(coordinate:any, status:any) {

      // 정상적으로 검색이 완료됐으면 
       if (status === kakao.maps.services.Status.OK) {
  
          var coords1 = new kakao.maps.LatLng(coordinate[0].y, coordinate[0].x);
  
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker1 = new kakao.maps.Marker({
              map: map1,
              position: coords1
          });
  
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow1 = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${animal.careNm}</div>`
          });
          infowindow1.open(map1, marker1);
  
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map1.setCenter(coords1);
        }
      });
  });
  kakao.maps.load();
}; 
  
  
  console.log(animal)
  return(
  <div className="DetailContainer">
    <div className="DetailKind">
      <strong className="DetailStrong">{animalKind}</strong>
      <time>{animal.formattedhappenDt}</time>
    </div>
    <div className="DetailImgCon">
      <img className="DetaiBGlImg" src={animal.popfile} alt={animal.kindCd} />
      <img className="DetailImg" src={animal.popfile} alt={animal.kindCd} />
    </div>
    <div className="DetailInformationCon">
      <div className="DetailInformation">
        <h2>유기동물 정보</h2>
        <IoIosInformationCircle className="informationCircle"/>
      </div>
      <div className="animalInformation">
        <div className="animalInformationDetail">
          <strong className="InformationStrong">품종:</strong>
          <span>{animalKind}</span> 
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">성별:</strong>
          <span>{animal.sexCd}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">나이:</strong>
          <span>{animal.age}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">체중:</strong>
          <span>{animal.weight}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">중성화여부:</strong>
          <span>{animal.neuterYn}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">상태:</strong>
          <span>{animal.processState}</span>
        </div>
        <div className="significantCon"><IoIosInformationCircle className="significant"/> 특이사항 : {animal.specialMark}</div>
      </div>
    </div>
    <div className="DetailInformationCon">
      <div className="animalInformationDetail">
        <h2>구조정보</h2>
        <div className="structureCon">
          <strong className="InformationStrong">발견장소:</strong>
          <span>{animal.happenPlace}</span>
        </div>
        <div id="map" style={{width:'1048px',height:'400px'}}></div>
      </div>
    </div>
    <div className="DetailInformationCon">
      <h2>동물보호센터</h2>
      <div className="animalInformation">
        <div className="animalInformationDetail">
          <strong className="InformationStrong">보호센터명:</strong>
          <span>{animal.careNm}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">보호소 전화번호:</strong>
          <span>{animal.careTel}</span>
        </div>
        <div className="animalInformationDetail">
          <strong className="InformationStrong">보호소 주소:</strong>
          <span>{animal.careAddr}</span>
        </div>
        <div id="map1" style={{width:'1048px',height:'400px'}}></div>
      </div>
    </div>
  </div>
  )
}
export default Detail