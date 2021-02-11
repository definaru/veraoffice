import { NextPageContext } from 'next'

const Errors = ({ statusCode }) => {
  return (
    <>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </>
  );
};

Errors.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Errors