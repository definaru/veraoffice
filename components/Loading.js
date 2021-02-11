export default function Loading({color = '#5c70ce', border = '#f6f9fc', text = 'Loading...', classes = 'text-light'})
{
    return (
        <>
        <div className="d-flex justify-content-center">
            <div>
                <div className="loader mr-2"></div>
            </div>
            <div className={classes}> {text}</div>
        </div>
        <style global jsx>{`
          .loader {
              border: 2px solid ${color};
              border-top: 2px solid ${border};
              border-radius: 50%;
              width: 19px;
              height: 19px;
              animation: spin 2s linear infinite;
          }
          
          @keyframes spin {
              0% { transform: rotate(0deg)}
              100% { transform: rotate(360deg)}
          }
        `}</style>
        </>
    )
}