import styled from 'styled-components';

export const Form = styled.form`
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const FormLabel = styled.label`
  font-weight: 600;
`;

export const FormRequired = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: rgb(65, 117, 245);
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    outline: none;
  }
`;

export const FormTextArea = styled.textarea`
  resize: none;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
  min-height: 4rem;
  line-height: 1.5;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    outline: none;
  }
`;

export const FormSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    outline: none;
  }
`;

export const FormTextCount = styled.span`
  position: absolute;
  color: #71717a;
  font-size: 0.875rem;
  bottom: -1.2rem;
  right: 0;
`;

export const UnitWrapper = styled.div`
  position: relative;
`;

export const UnitLabel = styled.span`
  position: absolute;
  top: 50%;
  right: 1.2rem;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 0.9rem;
`;

export const ErrorText = styled.span`
  color: #e00;
  font-size: 0.85rem;
`;

export const PriceInfo = styled.div`
  font-weight: 600;
  color: #0050cc;
`;
