import { ElementType, ReactNode } from 'react';

import classNames from 'classnames';

import { TColor } from '../../../types';

export type TFontVariant = 
    'h-tiny'
    | 'h-small'
    | 'h-base'
    | 'h-headline'
    | 'h-description'
    | 'h-subhead'
    | 'h-title'
    | 'h-display'
    | 'base-tiny'
    | 'base-small'
    | 'base-base'
    | 'base-headline'
    | 'base-description'
    | 'base-subhead'
    | 'base-title'
    | 'base-display';

interface IProps {
	/**
     * Orientação do texto podendo ser: `center`, `left`, `right`
     * 
     * @default left
     */
	align?: 'center' | 'left' | 'right'
	/**
     * Variante do tipo de texto. Cada tipo corresponde a um estilo diferente de tamanho de fonte, font-family ou peso.
     */
	variant?: TFontVariant
	/**
     * Cor do texto. Podendo ser `black`, `white`, `gray-100`, `gray-200`, `gray-300`, `gray-400`, `gray-500`, `gray-600`, `gray-700`, `gray-800`, `gray-900`, `primary-l`, `secondary-l`, `primary-m`, `secondary-m`, `primary-d`, `secondary-d`
     */
	color?: TColor
	/**
     * Texto que será envolvido pelo Componente.
     */
	children: ReactNode
	/**
     * className personalizada do componente
     */
	className?: string
	/**
     * Tag do texto que será renderizado
     * 
     * @default p
     */
	tag?: ElementType
	/**
     * Props para adicionar classe de text-overflow ao texto
     */
	overflow?: boolean
}

const Typography = (props: IProps) => {
	const {
		align = 'left',
		variant = 'base-base',
		tag: Tag = 'p',
		className,
		color = 'black',
		children,
		overflow
	} = props;

	const styles = {
		variants: {
			'h-tiny': 'text-tiny font-medium',
			'h-small': 'text-small font-medium',
			'h-base': 'text-base font-bold',
			'h-subhead': 'text-subhead font-semibold',
			'h-headline': 'text-headline font-bold',
			'h-description': 'text-description font-bold',
			'h-title': 'text-title font-semibold',
			'h-display': 'text-display font-semibold',
			'base-tiny': 'text-tiny font-normal',
			'base-small': 'text-small font-normal',
			'base-base': 'text-base font-normal',
			'base-headline': 'text-headline font-normal',
			'base-description': 'text-description font-normal',
			'base-subhead': 'text-subhead font-normal',
			'base-title': 'text-title font-normal',
			'base-display': 'text-display font-normal',
		},
		color: {
			'brand-main': 'text-brand-main',
			'brand-primary': 'text-brand-primary',
			'brand-secondary': 'text-brand-secondary',
			'brand-tertiary': 'text-brand-tertiary',
			'feedback-info-dark': 'text-feedback-info-dark',
			'feedback-info-default': 'text-feedback-info-default',
			'feedback-info-light': 'text-feedback-info-light',
			'feedback-success-dark': 'text-feedback-success-dark',
			'feedback-success-default': 'text-feedback-success-default',
			'feedback-success-light': 'text-feedback-success-light',
			'feedback-warning-dark': 'text-feedback-warning-dark',
			'feedback-warning-default': 'text-feedback-warning-default',
			'feedback-warning-light': 'text-feedback-warning-light',
			'feedback-danger-dark': 'text-feedback-danger-dark',
			'feedback-danger-default': 'text-feedback-danger-default',
			'feedback-danger-light': 'text-feedback-danger-light',
			'stroke-high': 'text-stroke-high',
			'stroke-medium': 'text-stroke-medium',
			'stroke-low': 'text-stroke-low',
			'title-high': 'text-title-high',
			'title-medium': 'text-title-medium',
			'title-low': 'text-title-low',
			'paragraph-dark': 'text-paragraph-dark',
			'paragraph-medium': 'text-paragraph-medium',
			'paragraph-low': 'text-paragraph-low',
			'background-low': 'text-background-low',
			'background-dark': 'text-background-dark',
			'basic-intense': 'text-basic-intense',
			'basic-link': 'text-basic-link',
			'basic-light': 'text-basic-light',
			'basic-placeholder': 'text-basic-placeholder',
			'black': 'text-black',
			'white': 'text-white',
		},
		align: {
			'left': 'text-left',
			'center': 'text-center',
			'right': 'text-right',
		},
		overflow: 'text-overflow-ellipsis overflow-hidden whitespace-nowrap',
	};

	return (
		<Tag
			className={classNames(
				styles.align[align],
				styles.color[color],
				styles.variants[variant],
				{ [styles.overflow]: overflow },
				className,
			)}
		>
			{children}
		</Tag>
	);
};

export default Typography;