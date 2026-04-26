import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	...tseslint.configs.recommended,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tseslint.parser,
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		rules: {
			// Отключаем базовые правила JS, так как используем TS‑аналоги
			'no-unused-vars': 'off', // Отключаем стандартное правило JS
			'no-undef': 'off', // Отключаем стандартное правило JS

			// Используем TS‑аналог для проверки неиспользуемых переменных
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_', // Игнорировать параметры, начинающиеся с _
					varsIgnorePattern: '^_', // Игнорировать переменные, начинающиеся с _
				},
			],

			// Стиль кода
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'no-mixed-spaces-and-tabs': 'error',
			'no-tabs': 'off',
			quotes: [
				'error',
				'single',
				{ avoidEscape: true, allowTemplateLiterals: true },
			],
			semi: ['error', 'never'],
			'max-len': [
				'error',
				{
					code: 120,
					tabWidth: 2,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
				},
			],
			'jsx-quotes': ['error', 'prefer-single'],
			'comma-dangle': ['error', 'always-multiline'],
			'arrow-parens': ['error', 'always'],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'space-before-function-paren': [
				'error',
				{ anonymous: 'always', named: 'never', asyncArrow: 'always' },
			],

			// Дополнительные TS‑правила
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-non-null-assertion': 'warn',
		},
	},
	{
		ignores: ['dist/', 'node_modules/', 'coverage/'],
	},
];
