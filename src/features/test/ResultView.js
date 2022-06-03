import React, {useEffect} from 'react'
import classNames from 'classnames/bind'
import styles from './styles/resultTest.module.css'
import AceEditor from 'react-ace-builds';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import doTestSlice from '../../redux/doTestSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function ResultView({totalScore, answers}) {

  const dapAn ={ '1':'A','2':'B','3':'C','4':'D'};
  const dispatch = useDispatch();
  useEffect(() => {
    
    return ()=>{
      dispatch(doTestSlice.actions.clearAnswer([]))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className={cx('content')}>
      <div className={cx('TotalScore')}>
        <h2>Tổng điểm: {totalScore} điểm</h2>
      </div>
      {
        answers.map((answer,index) =>(
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

export default ResultView;
