import { Zap } from 'react-feather';

import {
  DockerSnapshot,
  EnvironmentType,
} from '@/portainer/environments/types';
import { addPlural } from '@/portainer/helpers/strings';

import { Stat } from './EnvironmentStatsItem';

interface Props {
  snapshots: DockerSnapshot[];
  type: EnvironmentType;
}

export function EnvironmentStatsDocker({ snapshots = [], type }: Props) {
  if (snapshots.length === 0) {
    return (
      <div className="blocklist-item-line endpoint-item">
        <span className="blocklist-item-desc">No snapshot available</span>
      </div>
    );
  }

  const snapshot = snapshots[0];

  return (
    <div className="blocklist-item-line endpoint-item">
      <span className="blocklist-item-desc">
        <Stat
          value={addPlural(snapshot.StackCount, 'stack')}
          icon="layers"
          featherIcon
        />

        {!!snapshot.Swarm && (
          <Stat
            value={addPlural(snapshot.ServiceCount, 'service')}
            icon="shuffle"
            featherIcon
          />
        )}

        <ContainerStats
          running={snapshot.RunningContainerCount}
          stopped={snapshot.StoppedContainerCount}
          healthy={snapshot.HealthyContainerCount}
          unhealthy={snapshot.UnhealthyContainerCount}
        />
        <Stat
          value={addPlural(snapshot.VolumeCount, 'volume')}
          icon="database"
          featherIcon
        />
        <Stat
          value={addPlural(snapshot.ImageCount, 'image')}
          icon="list"
          featherIcon
        />
      </span>

      <span className="small text-muted space-x-2 vertical-center">
        <span>{snapshot.Swarm ? 'Swarm' : 'Standalone'}</span>
        <span>{snapshot.DockerVersion}</span>
        {type === EnvironmentType.AgentOnDocker && (
          <span>
            +{' '}
            <Zap className="icon icon-xs vertical-center" aria-hidden="true" />{' '}
            Agent
          </span>
        )}
        {snapshot.Swarm && (
          <Stat
            value={addPlural(snapshot.NodeCount, 'node')}
            icon="hard-drive"
            featherIcon
          />
        )}
      </span>
    </div>
  );
}

interface ContainerStatsProps {
  running: number;
  stopped: number;
  healthy: number;
  unhealthy: number;
}

function ContainerStats({
  running,
  stopped,
  healthy,
  unhealthy,
}: ContainerStatsProps) {
  const containersCount = running + stopped;

  return (
    <Stat
      value={addPlural(containersCount, 'container')}
      icon="box"
      featherIcon
    >
      {containersCount > 0 && (
        <span className="space-x-2 space-right">
          <Stat
            value={running}
            icon="power"
            featherIcon
            iconClass="icon-success"
          />
          <Stat
            value={stopped}
            icon="power"
            featherIcon
            iconClass="icon-danger"
          />
          <Stat
            value={healthy}
            icon="heart"
            featherIcon
            iconClass="icon-success"
          />
          <Stat
            value={unhealthy}
            icon="heart"
            featherIcon
            iconClass="icon-warning"
          />
        </span>
      )}
    </Stat>
  );
}
