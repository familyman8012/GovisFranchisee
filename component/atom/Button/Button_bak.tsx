import { FC, ButtonHTMLAttributes, ReactElement } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '@ComponentFarm/theme';
import Spinner from '../Spinner/Spinner';

type ButtonVariant =
  | 'transparent'
  | 'outline'
  | 'white'
  | 'black'
  | 'primary'
  | 'secondary'
  | 'secondaryGray'
  | 'tertiary'
  | 'tertiaryGray';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const buttonSizes = {
  sm: css`
    height: 2.5rem;
    padding: 0 1.4rem;
    font-size: 1.2rem;
  `,
  md: css`
    min-width: 7.8rem;
    height: 4rem;
    padding: 0 1.6rem;
    font-size: 1.4rem;
  `,
  lg: css`
    height: 4.4rem;
    padding: 0 1.8rem;
    font-size: 1.6rem;
  `,
  xl: css`
    height: 4.8rem;
    padding: 0 2rem;
    font-size: 1.6rem;
  `,
  '2xl': css`
    height: 6rem;
    padding: 0 2.8rem;
    font-size: 1.8rem;
  `,
};

const buttonVariants = {
  transparent: css`
    background-color: transparent;
    border: none;
    box-shadow: none;
    &:hover {
      background-color: ${theme.colors.gray50};
    }

    &:disabled {
      background-color: ${theme.colors.gray25};
    }
  `,
  white: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
  `,
  black: css`
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
  `,
  outline: css`
    border: 1px solid #6fcf97;
    background-color: ${theme.colors.white};
    color: #6fcf97;

    &:hover {
      background-color: ${theme.colors.brand50};
    }

    &:disabled {
      background-color: ${theme.colors.gray25};
    }
  `,
  primary: css`
    background-color: ${theme.colors.brand25};
    color: ${theme.colors.white};

    &:hover {
      background-color: ${theme.colors.brand50};
    }

    &:disabled {
      background-color: ${theme.colors.gray25};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.primary50};
    color: ${theme.colors.primary700};
    border: transparent;

    &:hover {
      background-color: ${theme.colors.primary100};
    }

    &:disabled {
      background-color: ${theme.colors.primary25};
      color: ${theme.colors.primary300};
    }
  `,
  secondaryGray: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray700};
    border: ${theme.colors.gray300};

    &:hover {
      background-color: ${theme.colors.gray50};
      color: ${theme.colors.gray800};
    }

    &:disabled {
      background-color: ${theme.colors.gray200};
      color: ${theme.colors.gray300};
    }
  `,
  tertiary: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.primary700};

    &:hover {
      background-color: ${theme.colors.primary50};
    }

    &:disabled {
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray300};
    }
  `,
  tertiaryGray: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray900};

    &:hover {
      background-color: ${theme.colors.gray50};
      color: ${theme.colors.gray800};
    }

    &:disabled {
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray300};
    }
  `,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  LeadingIcon?: ReactElement;
  TrailingIcon?: ReactElement;
  IconOnly?: ReactElement;
  disabled?: boolean;
  isLoading?: boolean;
}

export const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  IconOnly: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content:center;
  width:fit-content;
  border-radius: 0.375rem; // 6px
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  &:disabeld {
    opacity: 0.6
    cursor: 'not-allowed';
  }

  ${props => buttonVariants[props.variant]}
  ${props => buttonSizes[props.size]}
  ${props => props.IconOnly && { justifyContent: 'center' }}
`;

export const Button: FC<ButtonProps> = ({
  children,
  variant,
  size = 'md',
  LeadingIcon,
  TrailingIcon,
  IconOnly,
  disabled,
  isLoading,
  ...buttonProps
}) => {
  const Leading = LeadingIcon?.type;
  const Trailing = TrailingIcon?.type;
  const IconOnlyType = IconOnly?.type;

  return (
    <StyledButton
      {...buttonProps}
      type="button"
      variant={variant}
      size={size}
      IconOnly={!!IconOnly}
      disabled={disabled}
    >
      {Leading && (
        <Leading
          {...LeadingIcon.props}
          css={css`
            margin-right: ${size === '2xl' ? '0.75rem' : '0.5rem'};
          `}
        />
      )}
      {!isLoading ? children : <Spinner color="white" />}
      {IconOnlyType && (
        <IconOnlyType {...IconOnly.props} size={size === '2xl' ? 24 : 20} />
      )}
      {Trailing && (
        <Trailing
          {...TrailingIcon.props}
          css={css`
            margin-left: ${size === '2xl' ? '0.75rem' : '0.5rem'};
          `}
        />
      )}
    </StyledButton>
  );
};
