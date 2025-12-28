import { db } from "../db";
import { 
  users, 
  emailVerificationTokens, 
  passwordResetTokens, 
  otpChallenges,
  type User 
} from "@shared/schema";
import { eq, and, gt, isNull } from "drizzle-orm";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function getUserByPhone(phoneNumber: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
  return user;
}

export async function createUser(userData: {
  username: string;
  email: string;
  hashedPassword: string;
  fullName: string;
  phoneNumber?: string | null;
}): Promise<User> {
  const [user] = await db.insert(users).values({
    username: userData.username,
    email: userData.email,
    hashedPassword: userData.hashedPassword,
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber || null,
    role: "user",
    status: "active",
    emailVerified: false,
    phoneVerified: false,
  }).returning();
  
  return user;
}

export async function updateUserEmailVerified(userId: string): Promise<void> {
  await db.update(users)
    .set({ emailVerified: true, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

export async function updateUserPhoneVerified(userId: string): Promise<void> {
  await db.update(users)
    .set({ phoneVerified: true, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

export async function updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
  await db.update(users)
    .set({ hashedPassword, updatedAt: new Date() })
    .where(eq(users.id, userId));
}

export async function updateLastLogin(userId: string): Promise<void> {
  await db.update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, userId));
}

export async function createEmailVerificationToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
  await db.insert(emailVerificationTokens).values({
    userId,
    tokenHash,
    expiresAt,
  });
}

export async function getEmailVerificationToken(tokenHash: string): Promise<{ id: string; userId: string } | undefined> {
  const [tokenRecord] = await db.select()
    .from(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.tokenHash, tokenHash),
        gt(emailVerificationTokens.expiresAt, new Date()),
        isNull(emailVerificationTokens.usedAt)
      )
    );
  return tokenRecord;
}

export async function markEmailVerificationTokenAsUsed(tokenId: string): Promise<void> {
  await db.update(emailVerificationTokens)
    .set({ usedAt: new Date() })
    .where(eq(emailVerificationTokens.id, tokenId));
}

export async function createPasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void> {
  await db.insert(passwordResetTokens).values({
    userId,
    tokenHash,
    expiresAt,
  });
}

export async function getPasswordResetToken(tokenHash: string): Promise<{ id: string; userId: string } | undefined> {
  const [tokenRecord] = await db.select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        gt(passwordResetTokens.expiresAt, new Date()),
        isNull(passwordResetTokens.usedAt)
      )
    );
  return tokenRecord;
}

export async function markPasswordResetTokenAsUsed(tokenId: string): Promise<void> {
  await db.update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, tokenId));
}

export async function createOTPChallenge(data: {
  userId: string | null;
  channel: "sms" | "email";
  destination: string;
  codeHash: string;
  expiresAt: Date;
}): Promise<{ id: string }> {
  const [challenge] = await db.insert(otpChallenges).values({
    userId: data.userId,
    channel: data.channel,
    destination: data.destination,
    codeHash: data.codeHash,
    attempts: 0,
    maxAttempts: 3,
    expiresAt: data.expiresAt,
  }).returning();
  
  return { id: challenge.id };
}

export async function getActiveOTPChallenge(destination: string): Promise<{
  id: string;
  userId: string | null;
  codeHash: string;
  attempts: number | null;
  maxAttempts: number | null;
} | undefined> {
  const [challenge] = await db.select()
    .from(otpChallenges)
    .where(
      and(
        eq(otpChallenges.destination, destination),
        gt(otpChallenges.expiresAt, new Date()),
        isNull(otpChallenges.verifiedAt)
      )
    )
    .orderBy(otpChallenges.createdAt)
    .limit(1);
  return challenge;
}

export async function incrementOTPAttempts(challengeId: string, attempts: number): Promise<void> {
  await db.update(otpChallenges)
    .set({ attempts })
    .where(eq(otpChallenges.id, challengeId));
}

export async function markOTPAsVerified(challengeId: string): Promise<void> {
  await db.update(otpChallenges)
    .set({ verifiedAt: new Date() })
    .where(eq(otpChallenges.id, challengeId));
}

