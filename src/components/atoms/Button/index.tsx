import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

import classNames from 'classnames';

import Spinner from '../Spinner';

interface IProps {
	/**
     * Função executada no evento de clique do botão
     */
	onClick?: MouseEventHandler,
	/**
     * Texto ou Elemento HTML que será renderizado dentro do Componente
     */
	children?: ReactNode | ReactNode[]
	/**
     * className personalizada do Componente
     */
	className?: string
	/**
     * Propríedade que desabilita botão e evento de clique
     */
	disabled?: boolean
	/**
     * Estilo do Componente: `outline`, `text` e `contained`
     * 
     * @default contained
     */
	variant?: 'outlined' | 'contained'
	/**
     * Formatos do Componente: `block`, `square`, `contained`
     * 
     * @default contained
     */
	type?: 'button' | 'submit' | 'reset'
	/**
     * Cores do Componente: `primary`, `secondary`, `error`
     * 
     * @default primary
     */
	theme?: 'primary' | 'default' | 'danger' | 'dark-danger'
	/**
     * Tamanhos do Componente: `md`, `sm`
     */
	size?: 'md' | 'sm'
	/**
     * Propriedade que desabilita e renderiza o loader dentro do Componente
     */
	isLoading?: boolean
	/**
     * Tamanho máximo do Componente
     */
	maxWidth?: string
}

const Button = (props: IProps) => {
	const {
		children,
		onClick,
		className,
		theme = 'primary',
		size = 'md',
		variant = 'contained',
		disabled,
		type = 'button',
		isLoading = false
	} = props;

	const styles = {
		base: 'relative align-middle text-center flex items-center justify-center focus:outline-none transition ease-in-out duration-300',
		loading: '!text-transparent',
		disabled: {
			outlined: 'border bg-transparent border-gray-300 text-gray-300 cursor-not-allowed',
			contained: 'bg-paragraph-low text-title-low cursor-not-allowed'
		},
		size: {
			sm: 'px-4 h-9 text-small font-normal rounded-lg',
			md: 'px-4 h-10 text-base font-medium rounded-lg'
		},
		variants: {
			primary: {
				outlined: {
					base: 'border border-solid bg-transparent border-feedback-info-default text-feedback-info-default',
					hover: 'hover:bg-feedback-info-default/[0.12]'
				},
				contained: {
					base: 'bg-feedback-info-default text-white border border-feedback-info-default',
					hover: 'hover:bg-feedback-info-default/90'
				},
			},
			default: {
				outlined: {
					base: 'border border-solid bg-transparent border-title-low text-title-low',
					hover: 'hover:bg-title-low/[0.12]'
				},
				contained: {
					base: 'bg-title-low text-white border border-title-low',
					hover: 'hover:bg-title-low/90'
				},
			},
			danger: {
				outlined: {
					base: 'border border-solid bg-transparent border-feedback-danger-default text-feedback-danger-default',
					hover: 'hover:bg-feedback-danger-default/[0.12]'
				},
				contained: {
					base: 'bg-feedback-danger-default text-white border border-feedback-danger-default',
					hover: 'hover:bg-feedback-danger-default/90'
				},
			},
			'dark-danger': {
				outlined: {
					base: 'border border-solid bg-transparent border-feedback-danger-dark text-feedback-danger-dark',
					hover: 'hover:bg-feedback-danger-dark/[0.12]'
				},
				contained: {
					base: 'bg-feedback-danger-dark text-white border border-feedback-danger-dark',
					hover: 'hover:bg-feedback-danger-dark/90'
				},
			}
		}
	};

	const button_props: ButtonHTMLAttributes<HTMLButtonElement> = {
		onClick,
		disabled: disabled || isLoading,
		type,
		className: classNames(
			styles.base,
			styles.size[size],
			{ 
				[styles.disabled[variant]]: disabled,
				[styles.loading]: isLoading && !disabled,
				[styles.variants[theme][variant].base]: !disabled,
				[styles.variants[theme][variant].hover]: !disabled && !isLoading 
			},
			className
		)
	};

	return (
		<button {...button_props}>
			{isLoading && (
				<Spinner
					color={variant === 'outlined' ? theme : 'white'}
					size={23}
				/>
			)}
			{children}
		</button>
	);
};

export default Button;