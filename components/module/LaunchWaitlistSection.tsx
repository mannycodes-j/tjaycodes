import ActionButton from '@/components/common/ActionButton'

export default function LaunchWaitlistSection() {
  return (
    <section className="px-7 pb-24">
      <div className="mx-auto max-w-4xl rounded-4xl border border-[#00000014] bg-[#fff] p-8 md:p-12 text-center shadow-[0_12px_28px_rgba(18,19,23,0.12)]">
        <p className="text-[#000] text-sm uppercase tracking-[0.2em] mb-3">
          Ready to Get the Data You Need?
        </p>
        <h2 className="text-[#000] text-3xl md:text-4xl leading-tight mb-4">
          Let’s find out how I can help. Just fill out the form with the website
          you need data from. It’s completely free, with no obligation.
        </h2>
        <p className="text-[#000] max-w-2xl mx-auto mb-8">
          I will do some research on the website and get back to you as soon as
          possible.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <ActionButton variant="primary">Book a free consulation</ActionButton>
          
        </div>
      </div>
    </section>
  )
}
