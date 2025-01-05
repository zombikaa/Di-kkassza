const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="loadingpage-container">
        <div className="cube">
          <div className="cube__inner"></div>
        </div>
        <div className="cube">
          <div className="cube__inner"></div>
        </div>
        <div className="cube">
          <div className="cube__inner"></div>
        </div>
      </div>
      <img src="logo.png" width={200} alt="Logo" />
    </div>
  );
};

export default LoadingPage;
