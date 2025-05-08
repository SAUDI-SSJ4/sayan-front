import styled from "styled-components";

// خلفية هادئة للصفحة كلها
export const Wrapper = styled.div`
  background: linear-gradient(135deg, #eaf6fb 0%, #f9fafc 100%);
  min-height: 100vh;
  padding-top: 4.3rem;
    padding-left: 1.3rem;
      padding-right: 1.3rem;


`;

// حاوية وسطية نظيفة وبظل خفيف وتجاوب
export const Container = styled.div`
  max-width: 850px;
  margin: 40px auto 0 auto;
  padding: 2.5rem 2rem;
  background: #fff;
  box-shadow: 0 6px 32px 0 rgba(50,100,150,0.10), 0 1.5px 3px rgba(80,100,150,0.10);
  border-radius: 20px;
@media (max-width: 600px) {
    padding: 2.3rem 2rem; /* تعديل الحشو الداخلي قليلاً */
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: #174066;
  margin-top: 0;
  padding-top: 35px;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

export const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 2.2rem;
  margin-top: 0.7rem;
  color: #2196f3;
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 1.4rem;
    line-height: 1.7;
  }
`;

export const SectionTitle = styled.h3`
  color: #2196f3;
  font-size: 1.08rem;
  font-weight: 700;
  margin-top: 2.2rem;
  margin-bottom: 0.85rem;
  letter-spacing: 0.5px;
  border-right: 4px solid #e3f0fa;
  padding-right: 12px;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 1.4rem;
    margin-bottom: 0.7rem;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  font-size: 1.07rem;
  color: #384141;
  background: #f7fbfc;
  border-radius: 12px;
  margin-bottom: 1.05rem;
  padding: 0.9em 1.2em;
  box-shadow: 0 1px 7px 0 rgba(150,180,220,.07);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.25s;
  line-height: 1.8;
  &:hover {
    background: #eaf4fd;
  }
  @media (max-width: 600px) {
    font-size: 0.98rem;
    padding: 0.7em 0.5em;
    gap: 0.7rem;
  }
`;

export const IconWrapper = styled.div`
  margin-right: -1.1rem;
  display: flex;
  align-items: center;
  font-size: 1.4em;
  color: #1783bc;
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.7;
  margin: 1.2em 0;
  padding: 12px;
  padding-top: 12px;
`;