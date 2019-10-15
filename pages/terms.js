import Layout from '../components/layout'

function Terms () {
  return (
    <Layout title="Terms and Conditions" hideFeatures hideBanner>
      <h2 className="heading-2">Web Site Terms and Conditions of Use</h2>
      <div className="sub-text">Updated: 8/24/2019</div>
      <div className="bold-txt">1. Terms</div>
      <div className="text left">By accessing this web site, 
        you are agreeing to be bound by these web site Terms and Conditions of Use, 
        all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        If you do not agree with any of these terms, you are prohibited from using or accessing this site. 
        The materials contained in this web site are protected by applicable copyright and trade mark law.
      </div>
      <div className="bold-txt">2. Use License</div>
      <div className="text left">a. Permission is granted to temporarily download one copy of the materials 
        (information or software) on WeedTech.AI's web site for personal, 
        non-commercial transitory viewing only. 
        This is the grant of a license, not a transfer of title, and under this license you may not:
      </div>
      <div className="text left list">
        - i. modify or copy the materials;
      </div>
      <div className="text left list">
        - ii. use the materials for any commercial purpose, 
        or for any public display (commercial or non-commercial);
      </div>
      <div className="text left list">
        - iii. attempt to decompile or reverse engineer any software contained on WeedTech.AI's web site;
      </div>
      <div className="text left list">
        - iv. remove any copyright or other proprietary notations from the materials; or
      </div>
      <div className="text left list">
        - v. transfer the materials to another person or "mirror" the materials on any other server.
      </div>
      <div className="text left">
        b. This license shall automatically terminate if you violate any of these restrictions 
        and may be terminated by WeedTech.AI at any time. Upon terminating your viewing of these materials 
        or upon the termination of this license, you must destroy any downloaded materials in your possession 
        whether in electronic or printed format.
      </div>
      <div className="bold-txt">3. Disclaimer</div>
      <div className="text left">
        a. The materials on WeedTech.AI's web site are provided "as is". 
        WeedTech.AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, 
        including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
        or non-infringement of intellectual property or other violation of rights. Further, 
        WeedTech.AI does not warrant or make any representations concerning the accuracy, 
        likely results, or reliability of the use of the materials on its Internet web site or otherwise 
        relating to such materials or on any sites linked to this site.
      </div>
      <div className="bold-txt">4. Limitations</div>
      <div className="text left">
        In no event shall WeedTech.AI or its suppliers be liable for any damages 
        (including, without limitation, damages for loss of data or profit, or due to business interruption,) 
        arising out of the use or inability to use the materials on WeedTech.AI's Internet site, 
        even if WeedTech.AI or a WeedTech.AI authorized representative has been notified orally or in 
        writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied 
        warranties, or limitations of liability for consequential or incidental damages, 
        these limitations may not apply to you.
      </div>
      <div className="bold-txt">5. Revisions and Errata</div>
      <div className="text left">
        The materials appearing on WeedTech.AI's web site could include technical, 
        typographical, or photographic errors. 
        WeedTech.AI does not warrant that any of the materials on its web site are accurate, 
        complete, or current. WeedTech.AI may make changes to the materials contained on its 
        web site at any time without notice. WeedTech.AI does not, however, make any commitment to update the materials.
      </div>
      <div className="bold-txt">6. Links</div>
      <div className="text left">
        WeedTech.AI has not reviewed all of the sites linked to its 
        Internet web site and is not responsible for the contents of any such linked site. 
        The inclusion of any link does not imply endorsement by WeedTech.AI of the site. 
        Use of any such linked web site is at the user's own risk.
      </div>
      <div className="bold-txt">
        7. Site Terms of Use Modifications
      </div>
      <div className="text left">
        WeedTech.AI may revise these terms of use for its web site at any time without notice. 
        By using this web site you are agreeing to be bound by the then current version of these 
        Terms and Conditions of Use.
      </div>
      <div className="bold-txt">8. Governing Law</div>
      <div className="text left">
        Any claim relating to WeedTech.AI's web site 
        shall be governed by the laws of the State of OK without regard to its conflict of law provisions.            
        <br/><br/>General Terms and Conditions applicable to Use of a Web Site.
      </div>
      <style jx>{`
      .sub-text {
        margin-top: 50px;
        font-family: Montserrat, sans-serif;
        color: #000;
        font-size: 20px;
        line-height: 31px;
        text-align: left;
      }
      .bold-txt {
        margin-top: 25px;
        font-family: Montserrat, sans-serif;
        font-weight: 700;
      }
      .text {
        margin-top: 25px;
        padding-right: 25px;
        padding-left: 25px;
        font-family: Montserrat, sans-serif;
        color: #333;
        line-height: 28px;
        text-align: center;
      }
      .text.left {
        margin-top: 25px;
        font-size: 14px;
        text-align: left;
      }
      .text.left.list {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
      }     
      `}</style>
    </Layout>
  )
}

export default Terms;