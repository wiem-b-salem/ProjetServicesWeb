import { gql } from '@apollo/client';

// AUTH
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      message
    }
  }
`;

// VEHICLES
export const GET_VEHICLES = gql`
  query {
    vehicles {
      id
      plate
      type
      owner_id
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation AddVehicle($input: CreateVehicleInput!) {
    addVehicle(input: $input) {
      id
      plate
      type
    }
  }
`;

export const ADD_GPS = gql`
  mutation AddGps($vehicle_id: Int!, $input: CreateGpsInput!) {
    addGpsPosition(vehicle_id: $vehicle_id, input: $input) {
      id
      latitude
      longitude
    }
  }
`;

export const GET_HISTORY = gql`
  query GetHistory($vehicle_id: Int!) {
    vehicleHistory(vehicle_id: $vehicle_id) {
      id
      latitude
      longitude
      recorded_at
    }
  }
`;

// INCIDENTS
export const GET_INCIDENTS = gql`
  query {
    incidents {
      id
      type
      status
      description
      latitude
      longitude
    }
  }
`;

export const CREATE_INCIDENT = gql`
  mutation CreateIncident($input: CreateIncidentInput!) {
    createIncident(input: $input) {
      id
      type
      status
    }
  }
`;

export const UPDATE_INCIDENT_STATUS = gql`
  mutation UpdateStatus($id: Int!, $input: UpdateStatusInput!) {
    updateIncidentStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

// TRAFFIC
export const GET_ZONES = gql`
  query {
    zones {
      id
      name
      density
      level
    }
  }
`;

export const CREATE_ZONE = gql`
  mutation CreateZone($input: CreateZoneInput!) {
    createZone(input: $input) {
      id
      name
      level
    }
  }
`;

export const UPDATE_DENSITY = gql`
  mutation UpdateDensity($id: Int!, $input: UpdateDensityInput!) {
    updateDensity(id: $id, input: $input) {
      id
      name
      density
      level
    }
  }
`;

// NOTIFICATIONS
export const GET_NOTIFICATIONS = gql`
  query GetNotifications($user_id: Int!) {
    notifications(user_id: $user_id) {
      id
      message
      is_read
      created_at
    }
  }
`;

export const SEND_NOTIFICATION = gql`
  mutation SendNotification($input: CreateNotificationInput!) {
    sendNotification(input: $input) {
      id
      message
    }
  }
`;

export const MARK_READ = gql`
  mutation MarkRead($id: Int!) {
    markNotificationRead(id: $id) {
      id
      is_read
    }
  }
`;