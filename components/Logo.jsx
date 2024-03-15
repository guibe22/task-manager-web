 const AcmeLogo = ({h}) => (
    <img src={"http://localhost:3000/images/logo.png"} alt="Logo" style={{
        height: h || '50px',
        marginRight: "5px"
    }}/>
  );
export default AcmeLogo;