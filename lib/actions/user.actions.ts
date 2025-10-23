'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'
import { handleError } from '@/lib/utils'

import { CreateUserParams, UpdateUserParams } from '@/types'

/**
 * Create a new user in MongoDB
 */
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()
    console.log('💾 Creating user in MongoDB:', user)

    const newUser = await User.create(user)
    console.log('✅ User created:', newUser)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.error('❌ Error creating user:', error)
    handleError(error)
    throw error
  }
}

/**
 * Get a user by MongoDB _id
 */
export async function getUserById(userId: string) {
  try {
    await connectToDatabase()
    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error('❌ Error fetching user:', error)
    handleError(error)
    throw error
  }
}

/**
 * Update a user by Clerk ID
 */
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    console.log('✅ User updated:', updatedUser)
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    console.error('❌ Error updating user:', error)
    handleError(error)
    throw error
  }
}

/**
 * Delete a user by Clerk ID and clean up related data
 */
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    const userToDelete = await User.findOne({ clerkId })
    if (!userToDelete) throw new Error('User not found')

    console.log('🗑️ Deleting user and cleaning relationships:', userToDelete._id)

    // Clean up references in events and orders
    await Promise.all([
      Event.updateMany(
        { _id: { $in: userToDelete.events || [] } },
        { $pull: { organizer: userToDelete._id } }
      ),
      Order.updateMany(
        { _id: { $in: userToDelete.orders || [] } },
        { $unset: { buyer: 1 } }
      ),
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)

    // Revalidate home page if used in Next.js pages (optional)
    try {
      revalidatePath('/')
    } catch (e) {
      console.warn('⚠️ revalidatePath failed (probably webhook context):', e)
    }

    console.log('✅ User deleted:', deletedUser?._id)
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    handleError(error)
    throw error
  }
}
