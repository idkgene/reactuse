import Image from 'next/image'
import React, { FC, HTMLAttributes } from 'react'

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  /**
   * The size of the avatar.
   */
  size?: number
  /**
   * The source of the image.
   */
  src?: string
  /**
   * The username of the avatar.
   */
  username?: string
  /**
   * The provider of the avatar (e.g., 'github', 'gitlab', 'bitbucket').
   */
  provider?: 'github' | 'gitlab' | 'bitbucket'
  /**
   * Whether to show a placeholder instead of an image.
   */
  placeholder?: boolean
}

const Avatar: FC<AvatarProps> = ({
  size = 32,
  src,
  username,
  provider = 'github',
  placeholder,
}) => {
  const getAvatarUrl = () => {
    if (src) {
      return src
    } else if (username && provider) {
      switch (provider) {
        case 'github':
          return `https://github.com/${username}.png`
        case 'gitlab':
          return `https://gitlab.com/avatars/${username}`
        case 'bitbucket':
          return `https://bitbucket.org/account/${username}/avatar/`
        default:
          return ''
      }
    } else {
      return ''
    }
  }

  return (
    <Image
      src={placeholder ? '' : getAvatarUrl()}
      alt={username ? `${username}'s avatar` : 'Avatar'}
      role="img"
      aria-label={username ? `${username}'s avatar` : 'Default avatar'}
      className={`rounded-full border border-gray-700 border-solid ${
        placeholder ? 'bg-gray-300' : ''
      } h-${size} w-${size}`}
      width={`${size}`}
      height={`${size}`}
    />
  )
}

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The members of the avatar group.
   */
  members: { username: string; provider?: AvatarProps['provider'] }[]
  /**
   * The maximum number of avatars to show.
   */
  limit?: number
  /**
   * The size of the avatars.
   */
  size?: number
}

const AvatarGroup: FC<AvatarGroupProps> = ({
  members,
  limit = members.length,
  size = 32,
}) => {
  const visibleMembers = members.slice(0, limit)
  const remainingMembers = members.length - limit

  return (
    <div className="flex -space-x-2" role="group" id="avatar-group-label">
      <span id="avatar-group-label" className="sr-only">
        User avatars
      </span>
      {visibleMembers.map((member, index) => (
        <Avatar
          key={index}
          username={member.username}
          provider={member.provider}
          size={size}
        />
      ))}
      {remainingMembers > 0 && (
        <div
          className={`flex items-center justify-center rounded-full bg-gray-300 h-${size} w-${size} text-gray-600 font-medium`}
        >
          +{remainingMembers}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
