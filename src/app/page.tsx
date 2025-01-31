'use client'

import { cn } from '@/lib/utils'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'

interface IpinfoResponse {
  ip: string
  hostname: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
}

const fetcher = (url: string): Promise<IpinfoResponse> => fetch(url).then((res) => res.json())

export default function Home() {
  const [ip, setIp] = useState<string>('')

  const { data, error } = useSWR<IpinfoResponse>(
    `https://ipinfo.io/${ip}?token=63506fa5ae6d29`,
    fetcher,
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setIp(e.target.value)

  return (
    <main className='max-w-3xl mx-auto p-6 space-y-6'>
      <div className='space-y-4'>
        <input
          type='text'
          aria-label='Enter IP'
          placeholder='Enter IP'
          value={ip}
          onChange={handleInputChange}
          autoFocus
          className={cn(
            'rounded-md border border-surface0 bg-base',
            'py-2 px-4 capitalize shadow-sm',
            'outline-none transition-colors duration-300',
            'placeholder:text-overlay0 hover:border-surface1',
            'focus:text-text focus:border-surface2',
          )}
        />
      </div>

      {data && (
        <div className='space-y-4'>
          <ul className='animated-list grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <li className='flex flex-col'>
              <span className='text-overlay0'>IP</span>
              <span>{data.ip}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Hostname</span>
              <span>{data.hostname}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>City</span>
              <span>{data.city}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Region</span>
              <span>{data.region}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Country</span>
              <span>{data.country}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Location</span>
              <span>{data.loc}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Org</span>
              <span>{data.org}</span>
            </li>
            <li className='flex flex-col'>
              <span className='text-overlay0'>Timezone</span>
              <span>{data.timezone}</span>
            </li>
          </ul>
        </div>
      )}

      {error && <div className='text-red font-bold'>failed to load ip info</div>}
    </main>
  )
}
