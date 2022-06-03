import React, {useState,useEffect} from 'react'
import AceEditor from 'react-ace-builds';
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './detailTest.module.css'
import BaiLamkiemTraAPI from '../../../apis/baiLamKiemTraAPI';

const cx = classNames.bind(styles);

export default function DetailTest({idBaiLam,totalScore}) {
  
  const dapAn ={ '1':'A','2':'B','3':'C','4':'D'};
  const [testDetail,setTestDetail] = useState([])
  useEffect(()=>{
    let mounted = true;

    const getData = async () => {
      try {
        const response = await BaiLamkiemTraAPI.getDetailTest(idBaiLam);
        setTestDetail(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    if(mounted)
      getData();

    return () => mounted = false;
  },[idBaiLam])


  return (
  <div className={cx('content')}>
    <div className={cx('TotalScore')}>
      <h2>Tổng điểm: {totalScore} điểm</h2>
    </div>
    {
      testDetail.map((answer,index) =>(
        <div key={index}>
          {answer.loaiCauHoi === 0 
          ?(<div className={cx('item')}>
              <h2>Câu {answer.stt}</h2>
              <div className={cx('questionTitle')}>
                  {answer.cauHoi}
              </div>
              <div className={cx('answer')}>
                { answer.diemDatDuoc === 0 ?  <FontAwesomeIcon className={cx('error')} icon={faCircleXmark}/>
                  :<FontAwesomeIcon className={cx('success')} icon={faCircleCheck}/>
                }
                <p>Đáp án {dapAn[answer.dapAn]}</p>
              </div>

              <div className={cx('score')}>
              <p>Điểm đạt được: <span style={{color:"#d72929"}}>{answer.diemDatDuoc||0}</span>{'/'}<span >{answer.diemToiDa}</span></p>
              </div>
            </div>)
          :(<div className={cx('item')}>
              <h2>Câu {answer.stt}</h2>
              <div className={cx('questionTitle')}>
                  {answer.cauHoi}
              </div>
              <div className={cx('score')}>
                <p>Điểm đạt được: <span style={{color:"#d72929"}}>{answer.diemDatDuoc||0}</span>{'/'}<span>{answer.diemToiDa}</span></p>
              </div>

              <div className={cx('answer')}>
                <AceEditor 
                    value={answer.dapAn}
                    mode="c_cpp"
                    theme='one_dark'
                    fontSize='12pt'
                    name="UNIQUE_ID_OF_DIV"
                    width='90%'
                    height='400px'
                    maxLines={Infinity}
                    showPrintMargin={false}
                    readOnly
                    editorProps={{
                        $blockScrolling: true,
                    }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                    }}
                />
              </div>
            </div>)
            }

        </div>  
      ))
    }
  </div>
  )
}
