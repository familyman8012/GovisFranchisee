import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import Modal from '@ComponentFarm/modules/Modal/Modal';
import ErrorTxt from '@ComponentFarm/atom/ErrorTxt/ErrorTxt';
import { MailSendContentWrap } from './mailSendPopup_style';

type RecvEmials = { label: string; value: string };

export interface IMailData {
  recipient: RecvEmials[] | null;
  subject: string;
  link: string;
  contents: string;
}
export interface MailSendPopupProps {
  initial_recv_emails: { label: string; value: string }[];
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  submitFunc: (data: IMailData) => void;
}

const MailSendPopup = ({
  initial_recv_emails,
  title = '레포트',
  isOpen,
  onClose,
  submitFunc,
}: MailSendPopupProps) => {
  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      recipient: null,
      subject: '',
      link: typeof window !== 'undefined' ? window.location.href : '',
      contents: '',
    },
  });

  const onCloseReset = () => {
    reset(); // 입력된 모든 데이터를 초기화
    onClose(); // 기존 onClose 함수 호출
  };

  const onSubmit = (data: IMailData) => {
    toast.success('메일이 정상적으로 발송되었습니다.');
    submitFunc(data);
    onClose();
  };

  return (
    <Modal
      title={`${title}  메일 발송`}
      isOpen={isOpen}
      onFormSubmit={handleSubmit(onSubmit)}
      onClose={onCloseReset}
      onCancel={onCloseReset}
      showCloseButton
      addStyles={css`
        button {
          height: 5.5rem;
        }
      `}
    >
      <MailSendContentWrap>
        {initial_recv_emails && (
          <form>
            <div className={`box_inp ${errors.recipient ? 'error' : ''}`}>
              <div className="field">
                <label htmlFor="recipient">받는 사람</label>
                <Controller
                  name="recipient"
                  control={control}
                  rules={{ required: '받는 사람을 입력해야 합니다.' }}
                  render={({ field }) => (
                    <CreatableSelect
                      classNamePrefix="input_mail_send"
                      isMulti
                      placeholder=""
                      noOptionsMessage={() => null}
                      formatCreateLabel={userInput => `"${userInput}"`}
                      options={initial_recv_emails}
                      value={field.value}
                      // @ts-ignore
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.recipient && (
                <ErrorTxt>{String(errors.recipient.message)}</ErrorTxt>
              )}
            </div>
            <div className={`box_inp ${errors.subject ? 'error' : ''}`}>
              <div className="field">
                <label htmlFor="subject">제목</label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject', {
                    required: '필수 입력항목입니다.',
                  })}
                />
              </div>
              {errors.subject && <ErrorTxt>{errors.subject.message}</ErrorTxt>}
            </div>
            <div className={`box_inp ${errors.link ? 'error' : ''}`}>
              <div className="field">
                <label htmlFor="link">링크</label>
                <input
                  id="link"
                  type="text"
                  {...register('link', {
                    required: '필수 입력항목입니다.',
                  })}
                />
              </div>
              {errors.link && <ErrorTxt>{errors.link.message}</ErrorTxt>}
            </div>
            <div className={`box_inp ${errors.contents ? 'error' : ''}`}>
              <div className="field">
                <label htmlFor="contents">내용</label>
                <textarea
                  id="contents"
                  {...register('contents', {
                    required: '필수 입력항목입니다.',
                  })}
                />
              </div>
              {errors.contents && (
                <ErrorTxt>{errors.contents.message}</ErrorTxt>
              )}
            </div>
          </form>
        )}
      </MailSendContentWrap>
    </Modal>
  );
};

export default MailSendPopup;
