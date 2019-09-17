import Link from 'next/link'

function Footer() {
  return (
    <div className="footer">
      <div className="content-blox">
        <div className="footer-txt">
          <Link href="terms">
            <a className="footer-link">Terms & Conditions |</a>
          </Link>
          <Link href="policy">
            <a className="footer-link"> Privacy Policy |</a>
          </Link>
          <a href="http://www.discord.com" className="footer-link"> Contact Us</a>
        </div>
        <div className="footer-txt">
          Copyright © WeedTech.AI 2019
        </div>
      </div>
      <style jsx>{`
      .footer {
        margin-top: 65px;
      }
      .content-blox {
        width: 70%;
        margin-right: auto;
        margin-bottom: 50px;
        margin-left: auto;
      }
      .footer-txt {
        font-family: Montserrat,sans-serif;
        font-weight: 500;
        text-align: center;
      }
      .footer-link {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
      }
      `}</style>
    </div>
  )
}

export default Footer