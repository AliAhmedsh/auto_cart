import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { moderateScale } from 'react-native-size-matters';
import { bellGreenOutline } from '../../../assets/svg/Index';

interface AlertModalProps {
  visible: boolean;
  registrationNumber: string;
  onOpenDetails: () => void;
  onGoBack: () => void;
}

export default function AlertModal({
  visible,
  registrationNumber,
  onOpenDetails,
  onGoBack,
}: AlertModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
              <SvgXml xml={bellGreenOutline} width={moderateScale(28)} height={moderateScale(28)} />
            <Text style={styles.alertTitle}>Alert</Text>
          </View>

          <Text style={styles.message}>
            The Registration Number found is {registrationNumber}; Do you want the details?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onOpenDetails}
              activeOpacity={0.9}
            >
              <Text style={styles.primaryButtonText}>Open Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onGoBack}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>No, go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(18),
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    width: '88%',
    maxWidth: moderateScale(420),
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#E8FBE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: moderateScale(18),
    fontFamily: typography.semiBold,
    color: '#07B007',
  },
  message: {
    fontSize: moderateScale(15),
    fontFamily: typography.regular,
    color: colors.gray400,
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  buttonContainer: {
    gap: spacing.xs,
  },
  primaryButton: {
    backgroundColor: '#07B007',
    paddingVertical: spacing.md + 2,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: moderateScale(16),
    fontFamily: typography.semiBold,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: moderateScale(15),
    fontFamily: typography.regular,
    color: colors.gray400,
  },
});
