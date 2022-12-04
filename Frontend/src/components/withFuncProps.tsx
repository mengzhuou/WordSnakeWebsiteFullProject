import { useNavigate } from 'react-router-dom';

const lib:any[] = ['places'];

export const withFuncProps = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};