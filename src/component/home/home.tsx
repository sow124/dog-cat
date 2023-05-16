import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css'

function Home() {
  const [dog, setdog] = useState<any[]>([]);
  const [cat, setcat] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var today =year + month + day;
        var API_KEY = '0yca0KEvtW8EAZ2SrQi%2B6WMULVP9CV4ePYv0suN4JYjJfA7Q7w1I7HH1QJTdCpoBSaAWB6ARK%2FqeT%2BDOl%2BHSew%3D%3D'; /*URL*/
        const response = await fetch(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=${today}&upkind=417000&pageNo=1&numOfRows=2&ServiceKey=${API_KEY}`);
        const xml = await response.text();
        const parsedXml = new DOMParser().parseFromString(xml, "text/xml");
        const items = parsedXml.getElementsByTagName("item");
        const dogData:any = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const careNm = item.getElementsByTagName("careNm")[0].textContent;
          const filename = item.getElementsByTagName("filename")[0].textContent;
          const happenDt:any = item.getElementsByTagName("happenDt")[0].textContent;
          const kindCd = item.getElementsByTagName("kindCd")[0].textContent;
          const noticeEdt:any = item.getElementsByTagName("noticeEdt")[0].textContent;
          const noticeNo = item.getElementsByTagName("noticeNo")[0].textContent;
          const noticeSdt:any = item.getElementsByTagName("noticeSdt")[0].textContent;
          const popfile = item.getElementsByTagName("popfile")[0].textContent;
          const specialMark = item.getElementsByTagName("specialMark")[0].textContent;
          const weight = item.getElementsByTagName("weight")[0].textContent;
          const desertionNo = item.getElementsByTagName("desertionNo")[0].textContent;
          const happenDtDate = new Date(`${happenDt.slice(0, 4)}-${happenDt.slice(4, 6)}-${happenDt.slice(6)}`);
          const formattedhappenDt = `${happenDtDate.getFullYear()}.${String(happenDtDate.getMonth() + 1).padStart(2, '0')}.${String(happenDtDate.getDate()).padStart(2, '0')}`;
          const noticeSdtDate = new Date(`${noticeSdt.slice(0, 4)}-${noticeSdt.slice(4, 6)}-${noticeSdt.slice(6)}`);
          const formattednoticeSdt = `${noticeSdtDate.getFullYear()}.${String(noticeSdtDate.getMonth() + 1).padStart(2, '0')}.${String(noticeSdtDate.getDate()).padStart(2, '0')}`;
          const noticeEdtDate = new Date(`${noticeEdt.slice(0, 4)}-${noticeEdt.slice(4, 6)}-${noticeEdt.slice(6)}`);
          const formattednoticeEdt = `${noticeEdtDate.getFullYear()}.${String(noticeEdtDate.getMonth() + 1).padStart(2, '0')}.${String(noticeEdtDate.getDate()).padStart(2, '0')}`;
          dogData.push({
            careNm,
            filename,
            kindCd,
            formattednoticeEdt,
            noticeNo,
            formattednoticeSdt,
            popfile,
            specialMark,
            weight,
            desertionNo,
            formattedhappenDt,
          });
        }
        setdog(dogData);

      } catch (error) {
        console.error(error);
      }
      };
      fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            var date = new Date();
            var year = date.getFullYear();
            var month = ("0" + (1 + date.getMonth())).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            var today =year + month + day;
            var API_KEY = '0yca0KEvtW8EAZ2SrQi%2B6WMULVP9CV4ePYv0suN4JYjJfA7Q7w1I7HH1QJTdCpoBSaAWB6ARK%2FqeT%2BDOl%2BHSew%3D%3D'; /*URL*/
            const response = await fetch(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=${today}&upkind=422400&pageNo=1&numOfRows=2&ServiceKey=${API_KEY}`);
            const xml = await response.text();
            const parsedXml = new DOMParser().parseFromString(xml, "text/xml");
            const items = parsedXml.getElementsByTagName("item");
            const catData:any = [];
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              const careNm = item.getElementsByTagName("careNm")[0].textContent;
              const filename = item.getElementsByTagName("filename")[0].textContent;
              const happenDt:any = item.getElementsByTagName("happenDt")[0].textContent;
              const kindCd = item.getElementsByTagName("kindCd")[0].textContent;
              const noticeEdt:any = item.getElementsByTagName("noticeEdt")[0].textContent;
              const noticeNo = item.getElementsByTagName("noticeNo")[0].textContent;
              const noticeSdt:any = item.getElementsByTagName("noticeSdt")[0].textContent;
              const popfile = item.getElementsByTagName("popfile")[0].textContent;
              const specialMark = item.getElementsByTagName("specialMark")[0].textContent;
              const weight = item.getElementsByTagName("weight")[0].textContent;
              const desertionNo = item.getElementsByTagName("desertionNo")[0].textContent;
              const happenDtDate = new Date(`${happenDt.slice(0, 4)}-${happenDt.slice(4, 6)}-${happenDt.slice(6)}`);
              const formattedhappenDt = `${happenDtDate.getFullYear()}.${String(happenDtDate.getMonth() + 1).padStart(2, '0')}.${String(happenDtDate.getDate()).padStart(2, '0')}`;
              const noticeSdtDate = new Date(`${noticeSdt.slice(0, 4)}-${noticeSdt.slice(4, 6)}-${noticeSdt.slice(6)}`);
              const formattednoticeSdt = `${noticeSdtDate.getFullYear()}.${String(noticeSdtDate.getMonth() + 1).padStart(2, '0')}.${String(noticeSdtDate.getDate()).padStart(2, '0')}`;
              const noticeEdtDate = new Date(`${noticeEdt.slice(0, 4)}-${noticeEdt.slice(4, 6)}-${noticeEdt.slice(6)}`);
              const formattednoticeEdt = `${noticeEdtDate.getFullYear()}.${String(noticeEdtDate.getMonth() + 1).padStart(2, '0')}.${String(noticeEdtDate.getDate()).padStart(2, '0')}`;
              catData.push({
                careNm,
                filename,
                kindCd,
                formattednoticeEdt,
                noticeNo,
                formattednoticeSdt,
                popfile,
                specialMark,
                weight,
                desertionNo,
                formattedhappenDt,
              });
            }
            setcat(catData);
    
          } catch (error) {
            console.error(error);
          }
          };
          fetchData();
          }, []);

  return (
    <div className="homeCon">
      <div className="homecontainer">
        <h2 className="homeTitle">유기견</h2>
        <div className="homeaniamlContainer">
        {dog.map((animal,index) =>(
          <div className="homeaniamlDetailCon br_r" key={index}>
            <div className="animalCard">
            <Link
  to={{
    pathname: `/${animal.desertionNo}`,
    search: `?animals=${encodeURIComponent(JSON.stringify(animal))}`,
  }}
  className='animalLink'
>
              <figure>
                <img src={animal.popfile} alt={animal.kindCd} className='aniamlImg' />
              </figure>
            </Link>
            <div className="animalDetail">
              <div className="animalKind">
                <h3 className="animalDetailKind">{animal.kindCd}</h3>
                <time dateTime="yyyy-mm-dd">{animal.formattedhappenDt}</time>
              </div>
            </div>
              <div className="animalDetailBox">
                <span className="care">보호장소 :</span>
                <span>{animal.careNm}</span>
              </div>
              <div className="animalDetailBox">
                <span className="care">보호기간 :</span>
                <span>{animal.formattednoticeSdt} ~ {animal.formattednoticeEdt}</span>
              </div>
              <div className="animalDetailBox">
                <span className="care">특징 :</span>
                <span>{animal.specialMark}</span>
              </div>
              <div>
                <span className="care">몸무게:</span>
                <span>{animal.weight}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
        <Link to={'/dog'} className='more'>더보기</Link>
  </div>
  <div className="homecontainer">
        <h2 className="homeTitle">유기묘</h2>
        <div className="homeaniamlContainer">
        {cat.map((animal,index) =>(
          <div className="homeaniamlDetailCon" key={index}>
            <div className="animalCard">
            <Link
  to={{
    pathname: `/${animal.desertionNo}`,
    search: `?animals=${encodeURIComponent(JSON.stringify(animal))}`,
  }}
  className='animalLink'
>
              <figure>
                <img src={animal.popfile} alt={animal.kindCd} className='aniamlImg' />
              </figure>
            </Link>
            <div className="animalDetail">
              <div className="animalKind">
                <h3 className="animalDetailKind">{animal.kindCd}</h3>
                <time dateTime="yyyy-mm-dd">{animal.formattedhappenDt}</time>
              </div>
            </div>
              <div className="animalDetailBox">
                <span className="care">보호장소 :</span>
                <span>{animal.careNm}</span>
              </div>
              <div className="animalDetailBox">
                <span className="care">보호기간 :</span>
                <span>{animal.formattednoticeSdt} ~ {animal.formattednoticeEdt}</span>
              </div>
              <div className="animalDetailBox">
                <span className="care">특징 :</span>
                <span>{animal.specialMark}</span>
              </div>
              <div>
                <span className="care">몸무게:</span>
                <span>{animal.weight}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
        <Link to={'/cat'} className='more'>더보기</Link>
  </div>
</div>
  );
}

export default Home;