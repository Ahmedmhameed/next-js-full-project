import { g, auth, config } from "@grafbase/sdk";
// @ts-ignore
const User = g
	.model("User", {
		name: g.string().length({ min: 3, max: 20 }),
		email: g.string().unique(),
		avatarUrl: g.url(),
		description: g.string().optional(),
		githubUrl: g.url().optional(),
		linkedInUrl: g.url().optional(),
		projects: g
			// @ts-ignore
			.relation(() => Project)
			.list()
			.optional(),
	})
	.auth((rule) => {
		rule.public().read();
	});
// @ts-ignore
const Project = g
	.model("Project", {
		title: g.string().length({ min: 3 }),
		description: g.string(),
		image: g.url(),
		liveSiteUrl: g.url(),
		githubUrl: g.url(),
		category: g.string().search(),
		// @ts-ignore
		createdBy: g.relation(() => User),
	})
	.auth((rule) => {
		rule.public().read();
		rule.private().create().delete().update();
	});
// json web token
const jwt = auth.JWT({
	issuer: "grafbase",
	secret: g.env("NEXTAUTH_SECRET"),
});
export default config({
	schema: g,
	auth: {
		providers: [jwt],
		rules: (rules) => rules.private(),
	},
});
