export namespace ICourse {
	export interface Item {
		id: string;
		title: string;
		tags: string[],
		launchDate: string,
		status: string;
		description: string;
		duration: number;
		lessonsCount: number;
		containsLockedLessons: true;
		previewImageLink: string;
		rating: number;
		meta: Meta
	}

	export interface Meta {
		slug: string;
		skills: string;
		courseVideoPreview: {
			link: string;
			duration: number;
			previewImageLink: string;
		}
	}
	export interface Response {
		courses: Item[]
	}
}