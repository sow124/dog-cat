import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./dog.css";

function Dog() {
  const [animals, setAnimal] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var today = year + month + day;
        var API_KEY = "0yca0KEvtW8EAZ2SrQi%2B6WMULVP9CV4ePYv0suN4JYjJfA7Q7w1I7HH1QJTdCpoBSaAWB6ARK%2FqeT%2BDOl%2BHSew%3D%3D"; /*URL*/
        const response = await fetch(
          `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=${today}&upkind=417000&pageNo=${page}&numOfRows=10&ServiceKey=${API_KEY}`
        );
        const xml = await response.text();
        const parsedXml = new DOMParser().parseFromString(xml, "text/xml");
        const items = parsedXml.getElementsByTagName("item");
        const animalData: any = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const age = item.getElementsByTagName("age")[0].textContent;
          const careAddr = item.getElementsByTagName("careAddr")[0].textContent;
          const careTel = item.getElementsByTagName("careTel")[0].textContent;
          const careNm = item.getElementsByTagName("careNm")[0].textContent;
          const chargeNm = item.getElementsByTagName("chargeNm")[0].textContent;
          const colorCd = item.getElementsByTagName("colorCd")[0].textContent;
          const filename = item.getElementsByTagName("filename")[0].textContent;
          const happenDt: any = item.getElementsByTagName("happenDt")[0].textContent;
          const happenPlace = item.getElementsByTagName("happenPlace")[0].textContent;
          const kindCd = item.getElementsByTagName("kindCd")[0].textContent;
          const neuterYn = item.getElementsByTagName("neuterYn")[0].textContent;
          const noticeEdt: any = item.getElementsByTagName("noticeEdt")[0].textContent;
          const noticeNo = item.getElementsByTagName("noticeNo")[0].textContent;
          const noticeSdt: any = item.getElementsByTagName("noticeSdt")[0].textContent;
          const officetel = item.getElementsByTagName("officetel")[0].textContent;
          const orgNm = item.getElementsByTagName("orgNm")[0].textContent;
          const popfile = item.getElementsByTagName("popfile")[0].textContent;
          const processState = item.getElementsByTagName("processState")[0].textContent;
          const sexCd = item.getElementsByTagName("sexCd")[0].textContent;
          const specialMark = item.getElementsByTagName("specialMark")[0].textContent;
          const weight = item.getElementsByTagName("weight")[0].textContent;
          const desertionNo = item.getElementsByTagName("desertionNo")[0].textContent;
          const happenDtDate = new Date(`${happenDt.slice(0, 4)}-${happenDt.slice(4, 6)}-${happenDt.slice(6)}`);
          const formattedhappenDt = `${happenDtDate.getFullYear()}.${String(happenDtDate.getMonth() + 1).padStart(2, "0")}.${String(
            happenDtDate.getDate()
          ).padStart(2, "0")}`;
          const noticeSdtDate = new Date(`${noticeSdt.slice(0, 4)}-${noticeSdt.slice(4, 6)}-${noticeSdt.slice(6)}`);
          const formattednoticeSdt = `${noticeSdtDate.getFullYear()}.${String(noticeSdtDate.getMonth() + 1).padStart(2, "0")}.${String(
            noticeSdtDate.getDate()
          ).padStart(2, "0")}`;
          const noticeEdtDate = new Date(`${noticeEdt.slice(0, 4)}-${noticeEdt.slice(4, 6)}-${noticeEdt.slice(6)}`);
          const formattednoticeEdt = `${noticeEdtDate.getFullYear()}.${String(noticeEdtDate.getMonth() + 1).padStart(2, "0")}.${String(
            noticeEdtDate.getDate()
          ).padStart(2, "0")}`;
          animalData.push({
            age,
            careAddr,
            careNm,
            chargeNm,
            colorCd,
            filename,
            happenPlace,
            kindCd,
            neuterYn,
            formattednoticeEdt,
            noticeNo,
            formattednoticeSdt,
            officetel,
            orgNm,
            popfile,
            processState,
            sexCd,
            specialMark,
            weight,
            desertionNo,
            formattedhappenDt,
            careTel,
          });
        }
        setAnimal((prevAnimals) => [...prevAnimals, ...animalData]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    observer.current.observe(document.querySelector("#end-of-list"));

    return () => observer.current.disconnect();
  }, []);
  interface sate {
    state: any;
  }

  return (
    <div className="container">
      <h2 className="dogTitle">유기견</h2>
      <div className="aniamlContainer">
        {animals.map((animal, index) => (
          <div className="aniamlDetailCon" key={index}>
            <div className="animalCard">
              <Link
                to={{
                  pathname: `/${animal.desertionNo}`,
                  search: `?animals=${encodeURIComponent(JSON.stringify(animal))}`,
                }}
                className="animalLink"
              >
                <figure>
                  <img src={animal.popfile} alt={animal.kindCd} className="aniamlImg" />
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
                <span>
                  {animal.formattednoticeSdt} ~ {animal.formattednoticeEdt}
                </span>
              </div>
              <div className="animalDetailBox">
                <span className="care">특징 :</span>
                <span className="specialMark">{animal.specialMark}</span>
              </div>
              <div>
                <span className="care">몸무게:</span>
                <span>{animal.weight}</span>
              </div>
            </div>
          </div>
        ))}
        <div id="end-of-list"></div>
      </div>
    </div>
  );
}
export default Dog;
