import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';


export default function IndexPage() {
  

  return (
    <div className="px-4 py-5 my-5 text-center">
    <div className="col-lg-6 mx-auto">
      <p className="lead mt-4 mb-4 fw-normal">
        NextJS와 MongoDB를 이용한 로그인 세션 구현 샘플입니다.
        <br />
        계정이 있으시면 아래 로그인 버튼을 누르시고, 
        <br />
        없으시면 가입하기 버튼을 눌러 계정을 만드십시요.
      </p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn px-4 gap-3">
          
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn px-4"
        >
          
        </button>
      </div>
    </div>
  </div>
  )
}
