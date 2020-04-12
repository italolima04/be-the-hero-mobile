import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, Touchable, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";
import logoimg from ".././../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const route = useRoute();

  const incident = route.params.incident;
  const navigations = useNavigation();
  const message = `Olá ${incident.name}, estou entrando em contanto pois, gostaria de ajudar no caso "${incident.title}", com o valor de R$ ${incident.value} `;

  function navigateBack() {
    navigations.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do Caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+559991015100&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoimg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city} / {incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO: </Text>
        <Text style={styles.incidentValue}> {incident.title} </Text>

        <Text style={styles.incidentProperty}>VALOR: </Text>
        <Text style={styles.incidentValue}> R$ 120,00 </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia!</Text>
        <Text style={styles.heroTitle}>Seja o Herói desse Caso :)</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
