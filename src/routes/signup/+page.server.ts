import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		if (!email || !password) {
			return {
				error: 'Please enter your email and password'
			};
		}

		if (typeof password !== 'string' || password.length < 8 || password.length > 255) {
			return fail(400, {
				message: 'Invalid password'
			});
		}
	}
};
