export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink/70">
        MealMind AI collects only the information needed to run your account: your name,
        email, and the recipes and chat messages you create. We never sell your data.
        Ingredients and messages you send to the AI features are processed by Google's
        Gemini API solely to generate a response and are not used to train external
        models by MealMind. You can delete your account and associated data at any time
        by contacting us.
      </p>
      <p className="mt-4 text-sm text-ink/70">
        This is a student project built for academic purposes (SCIC-13 career
        incubator) and is not intended for production use with real personal data.
      </p>
    </section>
  );
}
