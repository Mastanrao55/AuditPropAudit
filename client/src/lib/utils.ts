import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numAmount);
};

export const getStatusColor = (status: string): string => {
  const statusLower = status?.toLowerCase() || '';
  const colorMap: Record<string, string> = {
    'clean': 'bg-green-50 text-green-700 border-green-200',
    'verified': 'bg-green-50 text-green-700 border-green-200',
    'active': 'bg-blue-50 text-blue-700 border-blue-200',
    'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'disposed': 'bg-gray-50 text-gray-700 border-gray-200',
    'appealed': 'bg-orange-50 text-orange-700 border-orange-200',
    'completed': 'bg-green-50 text-green-700 border-green-200',
    'flagged': 'bg-red-50 text-red-700 border-red-200',
    'disputed': 'bg-orange-50 text-orange-700 border-orange-200',
    'unclear': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'compliant': 'bg-green-50 text-green-700 border-green-200',
    'non_compliant': 'bg-red-50 text-red-700 border-red-200',
    'partial': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'form_16': 'bg-green-50 text-green-700 border-green-200',
    'form_22': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'encumbered': 'bg-red-50 text-red-700 border-red-200',
    'ongoing': 'bg-blue-50 text-blue-700 border-blue-200',
    'default': 'bg-gray-50 text-gray-700 border-gray-200',
  };
  
  return colorMap[statusLower] || colorMap['default'];
};

export const getRiskColor = (riskLevel: string | number): string => {
  if (typeof riskLevel === 'number') {
    if (riskLevel >= 75) return 'text-red-600';
    if (riskLevel >= 50) return 'text-orange-600';
    if (riskLevel >= 25) return 'text-yellow-600';
    return 'text-green-600';
  }

  const riskLower = riskLevel?.toLowerCase() || '';
  const colorMap: Record<string, string> = {
    'critical': 'bg-red-50 text-red-700 border-red-200',
    'high': 'bg-red-50 text-red-700 border-red-200',
    'medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'low': 'bg-green-50 text-green-700 border-green-200',
  };
  
  return colorMap[riskLower] || colorMap['low'];
};

export const getRiskBadgeVariant = (riskLevel: string): 'default' | 'destructive' | 'secondary' => {
  const riskLower = riskLevel?.toLowerCase() || '';
  if (riskLower === 'critical' || riskLower === 'high') return 'destructive';
  if (riskLower === 'medium') return 'default';
  return 'secondary';
};
