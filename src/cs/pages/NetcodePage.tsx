import { ConsoleCodeBlock } from '../components/ConsoleCodeBlock'

export function NetcodePage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-[14px] leading-6 text-cs-amberBright">
          Network Settings
        </div>
        <div className="mt-2 text-[10px] leading-5 text-cs-green/70">
          Goal: stable input-to-server delivery with clean interpolation and fewer
          “mystery” desync moments.
        </div>
      </div>

      <ConsoleCodeBlock
        title="The Config"
        commandLines={[
          'rate 25000',
          'cl_updaterate 101',
          'cl_cmdrate 101',
          'cl_interp 0',
          'cl_interp_ratio 1',
          'cl_lc 1',
          'cl_lw 1',
          'cl_resend 2',
          'cl_timeout 35',
          'ex_interp 0.01',
        ]}
      />

      <section className="border border-cs-green/20 bg-black/30 p-4">
        <div className="text-[11px] leading-5 text-cs-amberBright">
          Technical Analysis
        </div>
        <div className="mt-3 space-y-3 text-[10px] leading-5 text-cs-amber">
          <p>
            <span className="text-cs-amberBright">rate</span> caps the client’s
            bandwidth budget. Too low and you force packet starvation; too high
            and you can’t actually use it if your link spikes—so you want a
            realistic ceiling.
          </p>
          <p>
            <span className="text-cs-amberBright">cl_cmdrate</span> and{' '}
            <span className="text-cs-amberBright">cl_updaterate</span> set how
            often you send commands and request updates. Matching them keeps the
            pipeline balanced instead of “bursty”.
          </p>
          <p>
            <span className="text-cs-amberBright">cl_interp</span> /{' '}
            <span className="text-cs-amberBright">cl_interp_ratio</span> tune the
            smoothing window. Lower interpolation can feel snappier, but if you
            have packet loss you’ll notice pops—this is a latency vs stability
            trade.
          </p>
          <p>
            <span className="text-cs-amberBright">cl_lc</span> and{' '}
            <span className="text-cs-amberBright">cl_lw</span> enable lag
            compensation and client weapon prediction. These reduce “I shot on my
            screen” frustration, especially on higher pings.
          </p>
        </div>
      </section>
    </div>
  )
}

