function Banner() {
  return (
    <div>
      <div className="hero">
        <div className="hero-text-home">
          <img
            src="/static/images/WeedTechLogo_Light1x.png"
            width="650" 
            srcSet="/static/images/WeedTechLogo_Light1x-p-500.png 500w,
            /static/images/WeedTechLogo_Light1x-p-800.png 800w,
            /static/images/WeedTechLogo_Light1x-p-1080.png 1080w,
            /static/images/WeedTechLogo_Light1x-p-1600.png 1600w,
            /static/images/WeedTechLogo_Light1x-p-2000.png 2000w, 
            /static/images/WeedTechLogo_Light1x-p-2600.png 2600w,
            /static/images/WeedTechLogo_Light1x.png 3200w"
            sizes="60vw"
            alt="" 
            className="image"
          />
          <h1 className="heading">Seed-to-Sale for Everyone</h1>
        </div>
      </div>
      <style jsx>{`
      .hero {
        width: 100%;
        height: 400px;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.53), rgba(0, 0, 0, 0.53)), url(/static/images/weed-grower-bg.png);
        background-position: 0px 0px, 50% 50%;
        background-size: auto, cover;
        background-repeat: repeat, no-repeat;
      }
      .hero-text-home {
        padding-top: 120px;
        padding-bottom: 0;
        display: flex;
        width: 60%;
        margin-right: auto;
        margin-left: auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
      }
      .image {
        display: block;
        margin-right: auto;
        margin-left: auto;
        border: 0;
        max-width: 100%;
        vertical-align: middle;
        z-index: 10;
      }
      .heading {
        font-family: Montserrat,sans-serif;
        color: #fff;
        font-weight: 400;
        text-align: center;
      }
      `}</style>
    </div>
  )
}

export default Banner