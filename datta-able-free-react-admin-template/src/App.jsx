import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routers from './routes'; // ✅ 변경된 파일명 적용

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME || ''}>
      <Routers /> {/* ✅ 컴포넌트 형태로 사용 */}
    </BrowserRouter>
  );
};

export default App;
